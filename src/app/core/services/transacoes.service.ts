import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Account } from './account.service';
import { Category } from '../models/finance.model';
export interface Transaction {
  id?: number;
  description: string;
  amount: number;
  date: Date;
  type: 'INCOME' | 'EXPENSE';
  category: Category;
  account: Account;
}

@Injectable({ providedIn: 'root' })
export class TransactionService {
  private readonly baseUrl = `${environment.apiUrl}/transactions`;

  constructor(private http: HttpClient) { }

  public getAll(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.baseUrl, {
      responseType: "json",
      
    });
  }

  public update(id: number, category: any): Observable<Transaction> {
  return this.http.put<Transaction>(`${this.baseUrl}/${id}`, category);
}

  public create(category: Partial<Transaction>): Observable<Transaction> {
    return this.http.post<Transaction>(this.baseUrl, category);
  }

  public delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}