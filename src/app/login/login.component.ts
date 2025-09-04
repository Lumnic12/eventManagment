import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  emailError: string = '';
  passwordError: string = '';
  loginError: string = '';

  constructor(private router: Router, private authService: AuthService) { }

  validateEmail() {
    this.emailError = '';
    if (!this.email) {
      this.emailError = 'Email is required.';
    } else {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(this.email)) {
        this.emailError = 'Invalid email format.';
      }
    }
  }

  validatePassword() {
    this.passwordError = '';
    if (!this.password) {
      this.passwordError = 'Password is required.';
    } else if (this.password.length < 6) {
      this.passwordError = 'Password must be at least 6 characters.';
    }
  }

  login() {
    this.validateEmail();
    this.validatePassword();
    this.loginError = '';

    if (this.emailError || this.passwordError) {
      return;
    }

    const success = this.authService.login(this.email, this.password);
    if (success) {
      this.router.navigate(['/home']);
    } else {
      this.loginError = 'Invalid email or password.';
    }
  }
}
