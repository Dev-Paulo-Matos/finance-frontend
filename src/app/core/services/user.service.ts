import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { UserResponse } from '../../../types/api-types';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = `${environment.apiUrl}/users`;
  private storageKey = 'user';

  private userSubject = new BehaviorSubject<UserResponse | null>(this.loadUser());

  constructor(private http: HttpClient) {}

  public me(): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.baseUrl}/me`).pipe(
      tap((user) => this.setUser(user))
    );
  }

  public setUser(user: UserResponse): void {
    localStorage.setItem(this.storageKey, JSON.stringify(user));
    this.userSubject.next(user);
  }

  public getUser(): UserResponse | null {
    return this.userSubject.getValue();
  }

  public clearUser(): void {
    localStorage.removeItem(this.storageKey);
    this.userSubject.next(null);
  }

  private loadUser(): UserResponse | null {
    const user = localStorage.getItem(this.storageKey);
    return user ? JSON.parse(user) : null;
  }

  public get userIn$(): Observable<UserResponse | null> {
    return this.userSubject.asObservable();
  }

}