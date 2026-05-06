import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { TabsModule } from 'primeng/tabs';

interface MediaIssue {
    id: number;
    title?: string;
    description?: string;
    mediaType: 'PIC' | 'VIDEO';
    fileName: string;
    uploadDate: string;
    // add any other fields you need
}

@Component({
    imports: [CommonModule, TabsModule, TableModule, PaginatorModule],
    selector: 'app-view',
    template: `
        <p-tabs class="p-16" [(value)]="currentTab" (valueChange)="onTabChange($event)">
            <p-tablist>
                <p-tab value="0">All</p-tab>
                <p-tab value="1">Pictures</p-tab>
                <p-tab value="2">Video</p-tab>
            </p-tablist>
            <p-tabpanels>
                <p-tabpanel value="0">
                    <p-table [value]="allData()" [loading]="loading()" responsiveLayout="scroll">
                        <ng-template pTemplate="header">
                            <tr>
                                <th>ID</th>
                                <th>Type</th>
                                <th>File Name</th>
                            </tr>
                        </ng-template>
                        <ng-template pTemplate="body" let-item>
                            <tr>
                                <td>{{ item.id }}</td>
                                <td>{{ item.mediaType }}</td>
                                <td>{{ item.picOrVidName }}</td>
                            </tr>
                        </ng-template>
                    </p-table>

                    <p-paginator
                        [rows]="pageSize"
                        [totalRecords]="allTotal()"
                        [rowsPerPageOptions]="[10]"
                        [first]="allFirst()"
                        (onPageChange)="onAllPageChange($event)"
                    ></p-paginator>
                </p-tabpanel>
                <p-tabpanel value="1">
                    <p-table [value]="picData()" [loading]="loading()" responsiveLayout="scroll">
                        <ng-template pTemplate="header">
                            <tr>
                                <th>ID</th>
                                <th>File Name</th>
                            </tr>
                        </ng-template>
                        <ng-template pTemplate="body" let-item>
                            <tr>
                                <td>{{ item.id }}</td>
                                <td>{{ item.picOrVidName }}</td>
                            </tr>
                        </ng-template>
                    </p-table>

                    <p-paginator
                        [rows]="pageSize"
                        [totalRecords]="picTotal()"
                        [rowsPerPageOptions]="[10]"
                        [first]="picFirst()"
                        (onPageChange)="onPicPageChange($event)"
                    ></p-paginator>
                </p-tabpanel>
                <p-tabpanel value="2">
                    <p-table [value]="vidData()" [loading]="loading()" responsiveLayout="scroll">
                        <ng-template pTemplate="header">
                            <tr>
                                <th>ID</th>
                                <th>File Name</th>
                            </tr>
                        </ng-template>
                        <ng-template pTemplate="body" let-item>
                            <tr>
                                <td>{{ item.id }}</td>
                                <td>{{ item.picOrVidName }}</td>
                            </tr>
                        </ng-template>
                    </p-table>

                    <p-paginator
                        [rows]="pageSize"
                        [totalRecords]="vidTotal()"
                        [rowsPerPageOptions]="[10]"
                        [first]="vidFirst()"
                        (onPageChange)="onVidPageChange($event)"
                    ></p-paginator>
                </p-tabpanel>
            </p-tabpanels>
        </p-tabs>
    `,
})
export default class ViewComponent implements OnInit {
    // Signals for reactive state
    allData = signal<MediaIssue[]>([]);
    picData = signal<MediaIssue[]>([]);
    vidData = signal<MediaIssue[]>([]);

    allTotal = signal(0);
    picTotal = signal(0);
    vidTotal = signal(0);
    activeTab = '0';

    allFirst = signal(0);
    picFirst = signal(0);
    vidFirst = signal(0);

    loading = signal(false);
    readonly pageSize = 10;

    currentTab: string | number = '0'; // 0 = All, 1 = Pictures, 2 = Videos

    http = inject(HttpClient);

    ngOnInit() {
        this.loadAll(0);
    }

    onTabChange(event: any) {
        const page = 0;

        switch (
            this.currentTab // or switch(event) if you prefer
        ) {
            case 0:
            case '0':
                this.loadAll(page);
                break;
            case 1:
            case '1':
                this.loadPictures(page);
                break;
            case 2:
            case '2':
                this.loadVideos(page);
                break;
        }
    }

    // All Media
    loadAll(page: number) {
        this.loading.set(true);
        this.http
            .get<any>(`http://localhost:7898/api/media?page=${page}&size=${this.pageSize}`)
            .subscribe({
                next: res => {
                    this.allData.set(res.content);
                    this.allTotal.set(res.totalElements);
                    this.allFirst.set(page * this.pageSize);
                    this.loading.set(false);
                },
                error: () => this.loading.set(false),
            });
    }

    onAllPageChange(event: any) {
        this.loadAll(event.page);
    }

    // Pictures only
    loadPictures(page: number) {
        this.loading.set(true);
        this.http
            .get<any>(`http://localhost:7898/api/media/pictures?page=${page}&size=${this.pageSize}`)
            .subscribe({
                next: res => {
                    this.picData.set(res.content);
                    this.picTotal.set(res.totalElements);
                    this.picFirst.set(page * this.pageSize);
                    this.loading.set(false);
                },
                error: () => this.loading.set(false),
            });
    }

    onPicPageChange(event: any) {
        this.loadPictures(event.page);
    }

    // Videos only
    loadVideos(page: number) {
        this.loading.set(true);
        this.http
            .get<any>(`http://localhost:7898/api/media/videos?page=${page}&size=${this.pageSize}`)
            .subscribe({
                next: res => {
                    this.vidData.set(res.content);
                    this.vidTotal.set(res.totalElements);
                    this.vidFirst.set(page * this.pageSize);
                    this.loading.set(false);
                },
                error: () => this.loading.set(false),
            });
    }

    onVidPageChange(event: any) {
        this.loadVideos(event.page);
    }
}
