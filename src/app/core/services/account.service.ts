import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';

export interface Account {
  id: number;
  name: string;
  desc: string;    // Mapeia para o 'descriptor' no Java
  balance: number; // Saldo atual da conta
}

@Injectable({ providedIn: 'root' })
export class AccountService {
  private readonly baseUrl = `${environment.apiUrl}/accounts`;

  constructor(private http: HttpClient) { }

  public getAll(): Observable<Account[]> {
    return this.http.get<Account[]>(this.baseUrl);
  }

  public create(account: Partial<Account>): Observable<Account> {
    return this.http.post<Account>(this.baseUrl, account);
  }

  public update(id: number, account: Partial<Account>): Observable<Account> {
    return this.http.put<Account>(`${this.baseUrl}/${id}`, account);
  }

  public delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}