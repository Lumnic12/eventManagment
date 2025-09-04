import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { Icon } from 'ionicons/dist/types/components/icon/icon';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router, private authService: AuthService) { }

  login() {
    if (this.email && this.password) {
      // Use auth service to handle login
      const success = this.authService.login(this.email, this.password);
      if (success) {
        this.router.navigate(['/home']);
      }
    }
  }
}
