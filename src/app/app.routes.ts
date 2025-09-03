import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'signup',
    loadComponent: () => import('./sign-up/sign-up.component').then(m => m.SignUpComponent)
  },
  {
    path: 'home',
    loadComponent: () => import('./home-page/home-page.component').then(m => m.HomePageComponent)
  },
  {
    path: 'profile',
    loadComponent: () => import('./profile/profile.component').then(m => m.ProfileComponent)
  },
  {
    path: 'events',
    loadComponent: () => import('./events/events.component').then(m => m.EventsComponent)
  },
  {
    path: 'registered-events',
    loadComponent: () => import('./registered-events/registered-events.component').then(m => m.RegisteredEventsComponent)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];
