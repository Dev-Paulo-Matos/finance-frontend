import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CategoriesFilter, CategoryResponse } from '@api-types';
import { PageResponse } from '../../../types/page-response';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private readonly baseUrl = `${environment.apiUrl}/categories`;

  constructor(private http: HttpClient) { }

  public getAll(page: number = 0, size: number = 10, filter?: Partial<CategoriesFilter>): Observable<PageResponse<CategoryResponse>> {

    let params = new HttpParams()
      .set('page', page)
      .set('size', size);

    if (filter) {
      if (filter.name) params = params.set('name', filter.name);
      if (filter.transactionType) params = params.set('transactionType', filter.transactionType);
      if (filter.minLimitValue !== undefined) params = params.set('minLimitValue', filter.minLimitValue.toString());
      if (filter.maxLimitValue !== undefined) params = params.set('maxLimitValue', filter.maxLimitValue.toString());
    }

    return this.http.get<PageResponse<CategoryResponse>>(this.baseUrl, { params });
  }

  public update(id: number, category: any): Observable<CategoryResponse> {
  return this.http.put<CategoryResponse>(`${this.baseUrl}/${id}`, category);
}

  public create(category: Partial<CategoryResponse>): Observable<CategoryResponse> {
    return this.http.post<CategoryResponse>(this.baseUrl, category);
  }

  public delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}