import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, IonItem, IonLabel, IonList, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonCardSubtitle, IonBackButton, IonButtons, IonToast } from '@ionic/angular/standalone';
import { RegistrationService, Event } from '../registration.service';

@Component({
  selector: 'app-registered-events',
  templateUrl: './registered-events.component.html',
  styleUrls: ['./registered-events.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, IonItem, IonLabel, IonList, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonCardSubtitle, IonBackButton, IonButtons, IonToast],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RegisteredEventsComponent implements OnInit {
  registeredEvents: Event[] = [];
  isToastOpen = false;
  toastMessage = '';

  constructor(private registrationService: RegistrationService) { }

  ngOnInit() {
    this.loadRegisteredEvents();
  }

  loadRegisteredEvents() {
    this.registrationService.getRegisteredEvents().subscribe(events => {
      this.registeredEvents = events;
    });
  }

  unregisterFromEvent(event: Event) {
    this.registrationService.unregisterFromEvent(event.id);
    this.loadRegisteredEvents();
    this.toastMessage = `Unregistered from ${event.title}`;
    this.isToastOpen = true;
  }
}