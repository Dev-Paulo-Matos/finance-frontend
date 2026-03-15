import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { TransactionResponse } from '../../../types/api-types';
import { PageResponse } from '../../../types/page-response';

@Injectable({ providedIn: 'root' })
export class TransactionService {
  private readonly baseUrl = `${environment.apiUrl}/transactions`;

  constructor(private http: HttpClient) { }

  public getAll(): Observable<PageResponse<TransactionResponse>> {
    return this.http.get<PageResponse<TransactionResponse>>(this.baseUrl, {
      responseType: "json"
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