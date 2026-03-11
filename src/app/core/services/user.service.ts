import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = `${environment.apiUrl}/users`;
  private storageKey = 'user';

  private userSubject = new BehaviorSubject<User | null>(this.loadUser());

  constructor(private http: HttpClient) {}

  public me(): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/me`).pipe(
      tap((user) => this.setUser(user))
    );
  }

  public setUser(user: User): void {
    localStorage.setItem(this.storageKey, JSON.stringify(user));
    this.userSubject.next(user);
  }

  public getUser(): User | null {
    return this.userSubject.getValue();
  }

  public clearUser(): void {
    localStorage.removeItem(this.storageKey);
    this.userSubject.next(null);
  }

  private loadUser(): User | null {
    const user = localStorage.getItem(this.storageKey);
    return user ? JSON.parse(user) : null;
  }

  public get userIn$(): Observable<User | null> {
    return this.userSubject.asObservable();
  }

}