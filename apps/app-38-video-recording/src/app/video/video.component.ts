import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';

interface MediaUploadResponse {
    id: number;
    mediaType: string;
    fileName: string;
    issueDetails: string;
    message: string;
}

@Component({
    imports: [],
    selector: 'app-video',
    template: `
        <div class="flex flex-col items-center justify-center gap-4 p-6">
            <button
                class="px-6 py-3 rounded-2xl font-semibold text-white shadow-lg transition-all duration-300"
                [class.bg-green-600]="!isRecording()"
                [class.hover:bg-green-700]="!isRecording()"
                [class.bg-red-600]="isRecording()"
                [class.hover:bg-red-700]="isRecording()"
                (click)="toggleRecording()"
            >
                {{ isRecording() ? '⏹ Stop Recording' : '⏺ Start Recording' }}
            </button>

            @if (isRecording()) {
                <div
                    class="flex items-center gap-3 bg-gray-900 text-white px-4 py-2 rounded-xl shadow-md"
                >
                    <!-- Blinking red dot -->
                    <span class="w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>

                    <!-- Timer -->
                    <span class="font-mono text-lg">{{ recordingTime() }}s</span>
                </div>
            }

            @if (convertedVideoUrl()) {
                <div class="w-full max-w-2xl">
                    <h3 class="text-lg font-semibold mb-2 text-center">Preview</h3>
                    <video
                        class="w-full rounded-xl shadow-xl border border-gray-300"
                        [src]="convertedVideoUrl()"
                        controls
                        autoplay
                    >
                        Your browser does not support the video tag.
                    </video>
                    <!-- Send Button -->
                    <div class="flex justify-center mt-6">
                        <button
                            class="bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-400 px-10 py-4 rounded-2xl font-semibold text-white text-lg flex items-center gap-3 transition-all"
                            [disabled]="isUploading()"
                            (click)="uploadToServer()"
                        >
                            {{ isUploading() ? 'Uploading Video...' : '🚀 Send Video to Server' }}
                        </button>
                    </div>
                </div>
            }
        </div>
    `,
})
export default class VideoComponent {
    mediaRecorder = signal<MediaRecorder | null>(null);
    stream = signal<MediaStream | null>(null);
    chunks = signal<Blob[]>([]);

    isRecording = signal(false);
    isPaused = signal(true);
    recordingTime = signal(0);
    recordedVideoUrl = signal<string | null>(null);

    timerInterval: any;
    convertedVideoUrl = signal<string | null>(null);
    isUploading = signal(false); // ← New

    private http = inject(HttpClient);

    async toggleRecording() {
        if (this.isRecording()) {
            this.stopRecording();
        } else {
            try {
                await this.startRecording();
                this.convertedVideoUrl.set(null);
            } catch (err) {
                console.error(err);
            }
        }
    }

    private async convertAndPlay() {
        const blob = new Blob(this.chunks(), { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        this.convertedVideoUrl.set(url);
    }

    async startRecording(includeAudio = false): Promise<void> {
        try {
            const stream = await navigator.mediaDevices.getDisplayMedia({
                video: {
                    displaySurface: 'browser',
                    cursor: 'always',
                },
                audio: includeAudio,
                selfBrowserSurface: 'include',
            } as any);

            this.stream.set(stream);

            const recorder = new MediaRecorder(stream, {
                mimeType: 'video/webm;codecs=vp9,opus',
            });

            this.chunks.set([]);

            recorder.ondataavailable = (event: BlobEvent) => {
                if (event.data.size > 0) {
                    this.chunks.update(c => [...c, event.data]);
                }
            };

            recorder.onstart = () => {
                this.isRecording.set(true);
                this.isPaused.set(false);
                this.startTimer();
            };

            recorder.onpause = () => {
                this.isPaused.set(true);
            };

            recorder.onresume = () => {
                this.isPaused.set(false);
            };

            recorder.onstop = () => {
                this.isRecording.set(false);
                this.isPaused.set(true);
                this.stopTimer();
                this.cleanupStream();

                // Create Blob and Object URL for playback
                const videoBlob = new Blob(this.chunks(), { type: 'video/webm' });
                const url = URL.createObjectURL(videoBlob);
                this.recordedVideoUrl.set(url);
                this.convertAndPlay();
            };

            this.mediaRecorder.set(recorder);
            recorder.start();
        } catch (err) {
            console.error(err);
        }
    }

    getRecordedBlob(): Blob | null {
        if (this.chunks().length === 0) return null;

        return new Blob(this.chunks(), {
            type: 'video/webm',
        });
    }

    clearRecording() {
        this.chunks.set([]);
    }

    stopRecording() {
        const recorder = this.mediaRecorder();
        if (recorder && recorder.state !== 'inactive') {
            recorder.stop();
        }
    }

    pauseRecording() {
        const recorder = this.mediaRecorder();
        if (recorder && recorder.state === 'recording') {
            recorder.pause();
        }
    }

    resumeRecording() {
        const recorder = this.mediaRecorder();
        if (recorder && recorder.state === 'paused') {
            recorder.resume();
        }
    }

    private cleanupStream() {
        const stream = this.stream();
        stream?.getTracks().forEach(track => track.stop());
        this.stream.set(null);
    }

    startTimer() {
        this.recordingTime.set(0);

        this.timerInterval = setInterval(() => {
            this.recordingTime.update(t => t + 1);
        }, 1000);
    }

    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }

    downloadRecording() {
        const blob = new Blob(this.chunks(), { type: 'video/webm' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `screen-recording-${Date.now()}.webm`;
        a.click();

        URL.revokeObjectURL(url);
    }

    async uploadToServer() {
        const videoUrl = this.convertedVideoUrl();
        if (!videoUrl) {
            alert('No video available to upload');
            return;
        }

        this.isUploading.set(true);

        // Get the blob from the object URL
        const response = await fetch(videoUrl);
        const videoBlob = await response.blob();

        const formData = new FormData();
        formData.append('issueDetails', 'aaaaaaaaaaaaaaaaaaaaaaa');
        formData.append('file', videoBlob, 'recording.webm'); // important: .webm extension

        this.http
            .post<MediaUploadResponse>('http://localhost:7898/api/media/upload', formData)
            .subscribe({
                next: res => {
                    alert(`✅ Video uploaded successfully!\nID: ${res.id}\nFile: ${res.fileName}`);
                    console.log('Server Response:', res);
                    // this.convertedVideoUrl.set(null); // optional: clear after success
                },
                error: err => {
                    console.error('Upload failed', err);
                    alert('❌ Failed to upload video. Check console for details.');
                },
                complete: () => {
                    this.isUploading.set(false);
                },
            });
    }
}
