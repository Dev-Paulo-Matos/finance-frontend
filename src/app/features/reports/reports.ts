import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { provideIcons } from '@ng-icons/core';
import { tablerDownload, tablerBuildingBank, tablerTags, tablerReceipt, tablerReportAnalytics, tablerFileSpreadsheet } from '@ng-icons/tabler-icons';
import { ReportService } from '../../core/services/report.service';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reports',
  imports: [CommonModule, NgIcon, FormsModule],
  providers: [provideIcons({ tablerDownload, tablerBuildingBank, tablerTags, tablerReceipt, tablerReportAnalytics, tablerFileSpreadsheet })],
  templateUrl: './reports.html',
})
export class ReportsComponent {
  private reportService = inject(ReportService);
  public downloading = false;
  public startDate: string = '';
  public endDate: string = '';

  constructor() {
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    this.startDate = firstDay.toISOString().split('T')[0];
    this.endDate = now.toISOString().split('T')[0];
  }

  downloadAccounts() {
    this.downloading = true;
    this.reportService.downloadAccountsReport().subscribe({
      next: (blob) => this.saveFile(blob, 'relatorio_contas.csv'),
      error: (err) => { console.error(err); this.downloading = false; },
      complete: () => this.downloading = false
    });
  }

  downloadAccountsExcel() {
    this.downloading = true;
    this.reportService.downloadAccountsExcelReport().subscribe({
      next: (blob) => this.saveFile(blob, 'relatorio_contas.xlsx'),
      error: (err) => { console.error(err); this.downloading = false; },
      complete: () => this.downloading = false
    });
  }

  downloadCategories() {
    this.downloading = true;
    this.reportService.downloadCategoriesReport().subscribe({
      next: (blob) => this.saveFile(blob, 'relatorio_categorias.csv'),
      error: (err) => { console.error(err); this.downloading = false; },
      complete: () => this.downloading = false
    });
  }

  downloadCategoriesExcel() {
    this.downloading = true;
    this.reportService.downloadCategoriesExcelReport().subscribe({
      next: (blob) => this.saveFile(blob, 'relatorio_categorias.xlsx'),
      error: (err) => { console.error(err); this.downloading = false; },
      complete: () => this.downloading = false
    });
  }

  downloadTransactions() {
    this.downloading = true;
    this.reportService.downloadTransactionsReport(this.startDate, this.endDate).subscribe({
      next: (blob) => this.saveFile(blob, 'relatorio_transacoes.csv'),
      error: (err) => { console.error(err); this.downloading = false; },
      complete: () => this.downloading = false
    });
  }

  downloadTransactionsExcel() {
    this.downloading = true;
    this.reportService.downloadTransactionsExcelReport(this.startDate, this.endDate).subscribe({
      next: (blob) => this.saveFile(blob, 'relatorio_transacoes.xlsx'),
      error: (err) => { console.error(err); this.downloading = false; },
      complete: () => this.downloading = false
    });
  }

  private saveFile(blob: Blob, filename: string) {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }
}
