import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { DashboardSummaryResponse, TransactionResponse, DashboardChartsResponse } from '@api-types';
import { PageResponse } from '../../../types/page-response';

@Injectable({ providedIn: 'root' })
export class TransactionService {
  private readonly baseUrl = `${environment.apiUrl}/transactions`;

  constructor(private http: HttpClient) { }

  public getDashboardSummary(): Observable<DashboardSummaryResponse> {
    return this.http.get<DashboardSummaryResponse>(`${this.baseUrl}/dashboard/summary`);
  }

  public getDashboardCharts(startDate?: string, endDate?: string): Observable<DashboardChartsResponse> {
    let params = new HttpParams();
    if (startDate) params = params.set('startDate', startDate);
    if (endDate) params = params.set('endDate', endDate);
    return this.http.get<DashboardChartsResponse>(`${this.baseUrl}/dashboard/charts`, { params });
  }

  public getAll(params?: HttpParams): Observable<PageResponse<TransactionResponse>> {
    return this.http.get<PageResponse<TransactionResponse>>(this.baseUrl, {
      responseType: "json",
      params: params
    });
  }

  public update(id: string, category: any): Observable<TransactionResponse> {
  return this.http.put<TransactionResponse>(`${this.baseUrl}/${id}`, category);
}

  public create(category: Partial<TransactionResponse>): Observable<TransactionResponse> {
    return this.http.post<TransactionResponse>(this.baseUrl, category);
  }

  public delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}