import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  category: string;
  description: string;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  private registeredEvents: Event[] = [];
  private registeredEventsSubject = new BehaviorSubject<Event[]>([]);
  
  constructor() {
    // Load any saved registrations from localStorage
    const savedRegistrations = localStorage.getItem('registeredEvents');
    if (savedRegistrations) {
      this.registeredEvents = JSON.parse(savedRegistrations);
      this.registeredEventsSubject.next(this.registeredEvents);
    }
  }

  // Get all registered events
  getRegisteredEvents(): Observable<Event[]> {
    return this.registeredEventsSubject.asObservable();
  }

  // Register for an event
  registerForEvent(event: Event): void {
    // Check if already registered
    if (!this.isRegistered(event.id)) {
      this.registeredEvents.push(event);
      this.updateRegistrations();
    }
  }

  // Unregister from an event
  unregisterFromEvent(eventId: number): void {
    this.registeredEvents = this.registeredEvents.filter(event => event.id !== eventId);
    this.updateRegistrations();
  }

  // Check if user is registered for an event
  isRegistered(eventId: number): boolean {
    return this.registeredEvents.some(event => event.id === eventId);
  }

  // Get count of registered events
  getRegisteredEventCount(): number {
    return this.registeredEvents.length;
  }

  // Update registrations in localStorage and notify subscribers
  private updateRegistrations(): void {
    localStorage.setItem('registeredEvents', JSON.stringify(this.registeredEvents));
    this.registeredEventsSubject.next([...this.registeredEvents]);
  }
}