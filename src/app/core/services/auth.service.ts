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

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userSubject = new BehaviorSubject<boolean>(this.hasToken());

  private baseUrl = `${environment.apiUrl}/auth`

  constructor(private http: HttpClient) { }

  public login(credentials: LoginType): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/login`, credentials).pipe(
      tap(res => {
        localStorage.setItem('token', res.token);
        this.userSubject.next(true);
      })
    );
  }

  public register(credentials: RegisterType): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/register`, credentials).pipe(
      tap(res => {
        localStorage.setItem('token', res.token);
        this.userSubject.next(true);
      })
    );
  }


  logout() {
    localStorage.removeItem('token');
    this.userSubject.next(false);
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  get isLoggedIn$() {
    return this.userSubject.asObservable();
  }
}