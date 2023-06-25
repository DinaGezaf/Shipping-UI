import { Data } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  islogged = false;
  permissions: string[] = [];
  private token = '';

  constructor(private http: HttpClient) {
    let tokenstring = JSON.parse(localStorage.getItem('authToken')!);
    let claims = JSON.parse(localStorage.getItem('claims')!);
    if (!tokenstring) {
      return;
    }

    (this.islogged = true), (this.permissions = claims);
    this.token = tokenstring;
  }

  private readonly TOKEN_KEY = 'authToken';

  URL: string = 'http://localhost:5250/api/Account';

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
    localStorage.setItem(this.TOKEN_KEY, JSON.stringify(token));
  }

  setEmail(email: string) {
    localStorage.setItem('email', email);
  }

  setClaims(claims: any) {
    localStorage.setItem('claims', JSON.stringify(claims));
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

  checkPermission(permission: string) {
    for (let p of this.permissions) {
      if (p == permission) {
        return true;
      }
    }
    return false;
  }
}
