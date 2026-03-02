import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
export interface Categories {
  id: number;
  name: string;
  desc: string; // Mapeia para o 'desc' do Record
  type: 'INCOME' | 'EXPENSE'; // Baseado no seu TransactionType enum
  // Campos abaixo são opcionais por enquanto, já que o Java não os envia
  limitValue: number;
  spentValue: number;
  color: string;
  icon: string;
}

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private readonly baseUrl = `${environment.apiUrl}/categories`;

  constructor(private http: HttpClient) { }

  public getAll(): Observable<Categories[]> {
    return this.http.get<Categories[]>(this.baseUrl, {
      responseType: "json",
      
    });
  }

  public update(id: number, category: any): Observable<Categories> {
  return this.http.put<Categories>(`${this.baseUrl}/${id}`, category);
}

  public create(category: Partial<Categories>): Observable<Categories> {
    return this.http.post<Categories>(this.baseUrl, category);
  }

  public delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}