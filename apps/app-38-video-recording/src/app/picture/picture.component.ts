import { HttpClient } from '@angular/common/http';
import { Component, DestroyRef, effect, inject, signal } from '@angular/core';
import { toPng } from 'html-to-image';

interface SelectionBox {
    x: number;
    y: number;
    width: number;
    height: number;
}

interface MediaUploadResponse {
    id: number;
    mediaType: string;
    fileName: string;
    issueDetails: string;
    message: string;
}

@Component({
    imports: [],
    selector: 'app-picture',
    template: `
        <div class="min-h-screen bg-zinc-50 text-zinc-900 p-8">
            <div class="max-w-5xl mx-auto">
                <div class="text-center mb-12">
                    <h1 class="text-5xl font-bold mb-3 tracking-tight">Region Screenshot Tool</h1>
                    <p class="text-zinc-500 text-lg">
                        Select any area from the entire screen/viewport
                    </p>
                </div>

                <!-- Demo content -->
                <div
                    class="bg-white rounded-3xl p-10 border border-zinc-200 shadow-2xl mb-12 space-y-8"
                >
                    <h2 class="text-3xl font-semibold text-emerald-600">
                        Scroll down and try selecting different areas
                    </h2>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="bg-zinc-100 p-8 rounded-2xl">Card 1 - Some content here</div>
                        <div class="bg-zinc-100 p-8 rounded-2xl">Card 2 - More content</div>
                    </div>

                    <div
                        class="h-96 bg-gradient-to-br from-purple-100 to-zinc-100 rounded-3xl flex items-center justify-center text-6xl text-zinc-700"
                    >
                        Big Scrollable Area
                    </div>
                </div>

                <div class="text-center">
                    <button
                        class="bg-emerald-600 hover:bg-emerald-700 disabled:bg-zinc-300 disabled:text-zinc-500 px-10 py-5 rounded-2xl font-semibold text-lg flex items-center gap-3 mx-auto transition-all text-white"
                        [disabled]="isSelecting()"
                        (click)="startSelection()"
                    >
                        ✂️ Start Region Selection
                    </button>
                </div>

                <!-- Captured Preview -->
                @if (capturedImage()) {
                    <div class="mt-16">
                        <div class="flex justify-between items-center mb-6">
                            <h3 class="text-2xl font-medium text-zinc-900">Captured Region</h3>
                            <button
                                class="bg-blue-600 hover:bg-blue-700 px-8 py-3.5 rounded-2xl font-semibold text-white transition-colors flex items-center gap-2"
                                [disabled]="isUploading()"
                                (click)="uploadToServer()"
                            >
                                {{ isUploading() ? 'Uploading...' : '🚀 Send to Server' }}
                            </button>
                        </div>
                        <img
                            class="max-w-full rounded-3xl border border-zinc-200 shadow-2xl"
                            [src]="capturedImage()"
                            alt="Captured screenshot"
                        />
                    </div>
                }
            </div>
        </div>

        <!-- Full Viewport Selection Overlay -->
        @if (isSelecting()) {
            <div
                class="fixed inset-0 z-100 bg-black/60 cursor-crosshair overflow-hidden select-none"
                (pointerdown)="onPointerDown($event)"
                (pointermove)="onPointerMove($event)"
                (pointerup)="onPointerUp($event)"
            >
                <!-- Selection Box -->
                @if (selectionBox()) {
                    <div
                        class="absolute border-2 border-emerald-500 pointer-events-none"
                        [style.left.px]="selectionBox()!.x"
                        [style.top.px]="selectionBox()!.y"
                        [style.width.px]="selectionBox()!.width"
                        [style.height.px]="selectionBox()!.height"
                    ></div>
                }
            </div>
        }
    `,
})
export default class PictureComponent {
    isSelecting = signal(false);
    selectionBox = signal<SelectionBox | null>(null);
    capturedImage = signal<string | null>(null);
    isUploading = signal(false);
    now = signal(Date.now());

    // Internal state for drag
    private startX = 0;
    private startY = 0;
    private isDragging = false;
    private http = inject(HttpClient);

    private destroyRef = inject(DestroyRef);

    constructor() {
        // Cleanup on destroy using effect + DestroyRef
        effect(() => {
            const selecting = this.isSelecting();
            if (selecting) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'visible';
            }
        });

        // Keyboard escape support
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && this.isSelecting()) {
                this.cancelSelection();
            }
        };

        document.addEventListener('keydown', handleEsc);
        this.destroyRef.onDestroy(() => {
            document.removeEventListener('keydown', handleEsc);
        });
    }

    startSelection() {
        this.isSelecting.set(true);
        this.selectionBox.set(null);
        this.capturedImage.set(null);
        this.now.set(Date.now());
    }

    cancelSelection() {
        this.isSelecting.set(false);
        this.selectionBox.set(null);
    }

    onPointerDown(e: PointerEvent) {
        if (!this.isSelecting()) return;

        this.startX = e.clientX;
        this.startY = e.clientY;
        this.isDragging = true;

        this.selectionBox.set({
            x: this.startX,
            y: this.startY,
            width: 0,
            height: 0,
        });
    }

    onPointerMove(e: PointerEvent) {
        if (!this.isDragging || !this.selectionBox()) return;

        const currX = e.clientX;
        const currY = e.clientY;

        this.selectionBox.set({
            x: Math.min(this.startX, currX),
            y: Math.min(this.startY, currY),
            width: Math.abs(currX - this.startX),
            height: Math.abs(currY - this.startY),
        });
    }

    async onPointerUp(e: PointerEvent) {
        if (!this.isDragging || !this.selectionBox()) return;

        this.isDragging = false;

        const box = this.selectionBox()!;
        if (box.width < 30 || box.height < 30) {
            this.cancelSelection();
            return;
        }

        await this.captureViewportRegion(box);
    }

    private async captureViewportRegion(box: SelectionBox) {
        try {
            // Capture the entire document body (full scrollable content)
            const dataUrl = await toPng(document.body, {
                quality: 1,
                pixelRatio: 2,
                skipFonts: false,
                cacheBust: true,
            });

            // Crop to selected region
            const img = new Image();
            img.crossOrigin = 'anonymous';

            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d', { willReadFrequently: true })!;

                const scale = 2; // matches pixelRatio

                canvas.width = box.width * scale;
                canvas.height = box.height * scale;

                ctx.drawImage(
                    img,
                    box.x * scale,
                    box.y * scale,
                    box.width * scale,
                    box.height * scale,
                    0,
                    0,
                    canvas.width,
                    canvas.height,
                );

                this.capturedImage.set(canvas.toDataURL('image/png', 1.0));
                this.cancelSelection();
            };

            img.src = dataUrl;
        } catch (err) {
            console.error('Screenshot capture failed:', err);
            alert('Failed to capture the region. Please try again.');
            this.cancelSelection();
        }
    }

    /** New: Upload to Spring Boot backend */
    async uploadToServer() {
        const dataUrl = this.capturedImage();
        if (!dataUrl) return;

        this.isUploading.set(true);
        const formData = new FormData();

        // Hardcoded issue details as requested
        formData.append('issueDetails', 'aaaaaaaaaaaaaaaaaaaaaaa');

        // Convert base64 data URL to File object
        const file = await this.dataUrlToFile(dataUrl, 'screenshot.png');
        formData.append('file', file);

        this.http
            .post<MediaUploadResponse>('http://localhost:7898/api/media/upload', formData)
            .subscribe({
                next: (response: MediaUploadResponse) => {
                    alert(
                        '✅ Upload successful!\nID: ' +
                            response?.id +
                            '\nFile: ' +
                            response?.fileName,
                    );
                    console.log('Server Response:', response);
                    this.capturedImage.set(null);
                },
                error: (err: any) => {
                    console.error('Upload failed', err);
                    alert('❌ Upload failed. Check console.');
                },
                complete: () => {
                    this.isUploading.set(false);
                },
            });
    }

    /** Helper: Convert data URL (base64) to File */
    private async dataUrlToFile(dataUrl: string, filename: string): Promise<File> {
        const res = await fetch(dataUrl);
        const blob = await res.blob();
        return new File([blob], filename, { type: 'image/png' });
    }
}
