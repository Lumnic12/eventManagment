import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  private userDataSubject = new BehaviorSubject<any>({
    name: '>_<',
    email: 'Goddes@example.com'
  });
  userData$ = this.userDataSubject.asObservable();

  constructor() {
    // Check if user is already logged in from localStorage
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.userDataSubject.next(JSON.parse(storedUser));
      this.isLoggedInSubject.next(true);
    }
  }

  login(email: string, password: string): boolean {
    const userData = {
      name: email.split('@')[0].replace(/\./g, ' ').replace(/(\w)(\w*)/g, (g0, g1, g2) => g1.toUpperCase() + g2),
      email: email
    };
    
    this.userDataSubject.next(userData);
    this.isLoggedInSubject.next(true);
    // Store user data in localStorage for persistence
    localStorage.setItem('currentUser', JSON.stringify(userData));
    
    return true;
  }

  logout(): void {
    this.isLoggedInSubject.next(false);
    this.userDataSubject.next(null);
    localStorage.removeItem('currentUser');
  }

  getUserData(): any {
    return this.userDataSubject.value;
  }

  isAuthenticated(): boolean {
    return this.isLoggedInSubject.value;
  }
}