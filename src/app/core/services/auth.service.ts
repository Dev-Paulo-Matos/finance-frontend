import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
import { AuthResponse, User } from '../models/auth.model';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { UserService } from './user.service';

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
  
  private router = inject(Router)
  private userService = inject(UserService);

  constructor(private http: HttpClient) {}

  public login(credentials: LoginType): Observable<User> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/login`, credentials).pipe(
      tap((res) => this.setSession(res.token)),
      switchMap(() => this.userService.me())
    );
  }

  public register(credentials: RegisterType): Observable<User> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/register`, credentials).pipe(
      tap((res) => this.setSession(res.token)),
      switchMap(() => this.userService.me())
    );
  }

  public logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.loggedSubject.next(false);
    this.userService.clearUser();
    this.router.navigate(['login-register'])
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

  public get isLoggedIn$(): Observable<boolean> {
    return this.loggedSubject.asObservable();
  }

}