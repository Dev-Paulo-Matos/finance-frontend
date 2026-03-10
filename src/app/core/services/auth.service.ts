import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AuthResponse } from '../models/auth.model';
import { environment } from '../../../environments/environment';

interface LoginType {
  email: string;
  password: string;
}

interface RegisterType {
  userName: string;
  name: string;
  email: string;
  password: string;
  passCode: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = `${environment.apiUrl}/auth`;
  private tokenKey = 'token';

  private loggedSubject = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient) {}

  login(credentials: LoginType): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/login`, credentials).pipe(
      tap((res) => this.setSession(res.token))
    );
  }

  register(credentials: RegisterType): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/register`, credentials).pipe(
      tap((res) => this.setSession(res.token))
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.loggedSubject.next(false);
  }

  private setSession(token: string): void {
    localStorage.setItem(this.tokenKey, token);
    this.loggedSubject.next(true);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  private hasToken(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  get isLoggedIn$(): Observable<boolean> {
    return this.loggedSubject.asObservable();
  }

}