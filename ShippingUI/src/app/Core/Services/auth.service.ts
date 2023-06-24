import { Data } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import * as CryptoJS from 'crypto-js';

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
    localStorage.removeItem('role');
    localStorage.removeItem('email');
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
  setUserRole(role: string) {
    localStorage.setItem('role', role);
  }
  getUserRole() {
    return localStorage.getItem('role');
  }
}
