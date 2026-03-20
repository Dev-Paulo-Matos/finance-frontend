import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ReportService {
  private readonly baseUrl = `${environment.apiUrl}/reports`;

  constructor(private http: HttpClient) {}

  public downloadAccountsReport(): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/accounts`, { responseType: 'blob' });
  }

  public downloadCategoriesReport(): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/categories`, { responseType: 'blob' });
  }

  public downloadTransactionsReport(startDate?: string, endDate?: string): Observable<Blob> {
    let params = {};
    if (startDate && endDate) {
      params = { startDate, endDate };
    }
    return this.http.get(`${this.baseUrl}/transactions`, { responseType: 'blob', params });
  }

  public downloadAccountsExcelReport(): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/excel/accounts`, { responseType: 'blob' });
  }

  public downloadCategoriesExcelReport(): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/excel/categories`, { responseType: 'blob' });
  }

  public downloadTransactionsExcelReport(startDate?: string, endDate?: string): Observable<Blob> {
    let params = {};
    if (startDate && endDate) {
      params = { startDate, endDate };
    }
    return this.http.get(`${this.baseUrl}/excel/transactions`, { responseType: 'blob', params });
  }
}
