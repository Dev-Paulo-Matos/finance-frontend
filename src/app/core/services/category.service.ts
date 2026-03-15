import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CategoryResponse } from '../../../types/api-types';
import { PageResponse } from '../../../types/page-response';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private readonly baseUrl = `${environment.apiUrl}/categories`;

  constructor(private http: HttpClient) { }

  public getAll(): Observable<PageResponse<CategoryResponse>> {
    return this.http.get<PageResponse<CategoryResponse>>(this.baseUrl, {
      responseType: "json",
      
    });
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