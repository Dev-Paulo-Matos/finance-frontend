import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { AccountFilter, AccountResponse } from '@api-types';
import { PageResponse } from '../../../types/page-response';

@Injectable({ providedIn: 'root' })
export class AccountService {

  private readonly baseUrl = `${environment.apiUrl}/accounts`;

  constructor(private http: HttpClient) {}

  public getAll(page: number = 0, size: number = 10, filter?: Partial<AccountFilter>): Observable<PageResponse<AccountResponse>> {

    let params = new HttpParams()
      .set('page', page)
      .set('size', size);

    if (filter) {
      if (filter.name) params = params.set('name', filter.name);
      if (filter.minBalance !== undefined) params = params.set('minBalance', filter.minBalance.toString());
      if (filter.maxBalance !== undefined) params = params.set('maxBalance', filter.maxBalance.toString());
    }

    return this.http.get<PageResponse<AccountResponse>>(this.baseUrl, { params });

  }

  public getMountAll(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/mount/all`)
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