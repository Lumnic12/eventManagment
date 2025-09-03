import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userData: any = null;
  isLoggedIn = false;
  userEmoji = '😎'; // Default emoji for user

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    // Subscribe to auth service to get user login state
    this.authService.isLoggedIn$.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
    });

    // Subscribe to auth service to get user data
    this.authService.userData$.subscribe(data => {
      this.userData = data;
      
      // Generate a consistent emoji based on user email if available
      if (data && data.email) {
        const emailHash = this.simpleHash(data.email);
        const emojis = ['😎', '🚀', '🔥', '💫', '🌟', '👨‍💻', '👩‍💻', '🦸‍♂️', '🦸‍♀️', '🧙‍♂️'];
        this.userEmoji = emojis[emailHash % emojis.length];
      }
    });
  }

  // Simple hash function for generating consistent emoji
  simpleHash(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash |= 0; // Convert to 32bit integer
    }
    return Math.abs(hash);
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  navigateToSignup() {
    this.router.navigate(['/signup']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
