import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { AccountResponse } from '../../../types/api-types';
import { PageResponse } from '../../../types/page-response';

@Injectable({ providedIn: 'root' })
export class AccountService {

  private readonly baseUrl = `${environment.apiUrl}/accounts`;

  constructor(private http: HttpClient) {}

  public getAll(page: number = 0, size: number = 10): Observable<PageResponse<AccountResponse>> {

    const params = new HttpParams()
      .set('page', page)
      .set('size', size);

    return this.http.get<PageResponse<AccountResponse>>(this.baseUrl, { params });

  }

  public create(account: Partial<AccountResponse>): Observable<AccountResponse> {
    return this.http.post<AccountResponse>(this.baseUrl, account);
  }

  public update(id: number, account: Partial<AccountResponse>): Observable<AccountResponse> {
    return this.http.put<AccountResponse>(`${this.baseUrl}/${id}`, account);
  }

  public delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

}