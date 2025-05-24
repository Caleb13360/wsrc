import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table, TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DatePickerModule } from 'primeng/datepicker';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Product, ProductService } from '../../../service/product.service';
import { ApiService } from '../../../service/api';
import { Race } from '../../../../../models/race';

interface Column {
    field: string;
    header: string;
    customExportHeader?: string;
}

interface ExportColumn {
    title: string;
    dataKey: string;
}

@Component({
    selector: 'app-races',
    standalone: true,
    imports: [
        CommonModule,
        TableModule,
        FormsModule,
        ButtonModule,
        RippleModule,
        ToastModule,
        ToolbarModule,
        RatingModule,
        InputTextModule,
        TextareaModule,
        SelectModule,
        RadioButtonModule,
        InputNumberModule,
        DialogModule,
        TagModule,
        InputIconModule,
        IconFieldModule,
        ConfirmDialogModule,
        DatePickerModule
    ],
    templateUrl: './races.html',
    providers: [MessageService, ProductService, ConfirmationService, ApiService],
})
export class Races {
    raceDialog: boolean = false;

    race!: Race;

    constructor(
        public apiService: ApiService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    getSeverity(status: string) {
        switch (status) {
            case 'Completed':
                return 'success';
            case 'In Progress':
                return 'contrast';
            case 'Cancelled':
                return 'danger';
            default:
                return 'info';
        }
    }

    editRace(race: Race) {
        this.race = race;
        this.raceDialog = true;
    }
    hideDialog() {
        this.raceDialog = false;
    }
    saveRace() {
        this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Feature not ready yet',
            life: 2000
        });
        return;
        this.apiService.updateRace(this.race).subscribe({
            next: () => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Race Updated',
                    life: 2000
                });
                this.raceDialog = false;
            },
            error: (err) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Failed to update race: ' + err.message,
                    life: 2000
                });
            }
        });
    }
    deleteRace(race: Race) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + race.race_name + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Feature not ready yet',
                    life: 2000
                });
                return;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Product Deleted',
                    life: 2000
                });
            }
        });
    }
    createRace(){
        this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Feature not ready yet',
            life: 2000
        });
        return;
    }
}
