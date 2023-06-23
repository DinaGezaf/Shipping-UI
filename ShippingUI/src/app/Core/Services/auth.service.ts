import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN_KEY = 'authToken';

  URL: string = 'http://localhost:5250/api/Account';
  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    const loginData = {
      email: email,
      password: password,
    };

    return this.http.post(`${this.URL}/login`, loginData);
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  setToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  setEmail(email: string) {
    localStorage.setItem('email', email);
  }

  getEmail() {
    return localStorage.getItem('email');
  }

  getUserRole() {}
}
