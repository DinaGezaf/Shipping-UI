import { Data, Route, Routes } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN_KEY = 'authToken';
  private isAuthenticated = false;
  LoggedIn: boolean = false;
  generatedRoutes!:string;

  URL: string = 'http://localhost:5250/api/Account';
  constructor(private http: HttpClient) {
    this.isAuthenticated = !!localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const generatedRoutesString = localStorage.getItem('generatedRoutes');
    let generatedRoutes: Routes = [];

    if (role && generatedRoutesString) {
      generatedRoutes = JSON.parse(generatedRoutesString);
      this.LoggedIn = true;
    }
  }

  login(email: string, password: string) {
    const loginData = {
      email: email,
      password: password,
    };
    this.isAuthenticated = true;

    return this.http.post(`${this.URL}/login`, loginData);
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem('role');
    localStorage.removeItem('email');
    this.isAuthenticated = false;
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
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

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  verifyToken(): boolean {
    const token = this.getToken();

    if (token) {
      this.isAuthenticated = true;
    } else {
      this.isAuthenticated = false;
    }

    return this.isAuthenticated;
  }
  getGeneratedRoutes() {
    const generatedRoutes = localStorage.getItem('generatedRoutes');
    return generatedRoutes ? JSON.parse(generatedRoutes) : null;
  }
  setGeneratedRoutes(routes: string) {
    this.generatedRoutes = routes;
  }
}
