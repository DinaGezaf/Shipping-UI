import { Component } from '@angular/core';
import { AuthService } from './Core/Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Shipping';
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.verifyToken();
  }

}
