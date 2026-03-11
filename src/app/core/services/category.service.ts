import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Category } from '../models/finance.model';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private readonly baseUrl = `${environment.apiUrl}/categories`;

  constructor(private http: HttpClient) { }

  public getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseUrl, {
      responseType: "json",
      
    });
  }

  public update(id: number, category: any): Observable<Category> {
  return this.http.put<Category>(`${this.baseUrl}/${id}`, category);
}

  public create(category: Partial<Category>): Observable<Category> {
    return this.http.post<Category>(this.baseUrl, category);
  }

  public delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}