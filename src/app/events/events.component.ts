import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, IonItem, IonLabel, IonList, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonCardSubtitle, IonSegment, IonSegmentButton, IonGrid, IonRow, IonCol, IonChip, IonBadge, IonBackButton, IonButtons, IonSearchbar, IonFab, IonFabButton, IonToast } from '@ionic/angular/standalone';
import { RegistrationService } from '../registration.service';

interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  category: string;
  description: string;
  image: string;
}

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, IonItem, IonLabel, IonList, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonCardSubtitle, IonSegment, IonSegmentButton, IonGrid, IonRow, IonCol, IonChip, IonBadge, IonBackButton, IonButtons, IonSearchbar, IonFab, IonFabButton, IonToast],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EventsComponent implements OnInit {
  registeredCount = 0;
  isToastOpen = false;
  toastMessage = '';
  selectedCategory = 'all';
  filteredEvents: Event[] = [];
  searchTerm = '';
  selectedEvent: Event | null = null;
  
  constructor(private registrationService: RegistrationService) {}
  
  // Functions are defined later in the file
  
  events = [
    // Music Events
    {
      id: 1,
      title: 'Summer Music Festival',
      date: 'June 15, 2023',
      location: 'Central Park, New York',
      category: 'Music',
      description: 'Join us for a day of amazing music performances!',
      image: 'https://as2.ftcdn.net/v2/jpg/02/16/94/65/1000_F_216946587_rmug8FCNgpDCPQlstiCJ0CAXJ2sqPRU7.jpg'
    },
    {
      id: 2,
      title: 'Jazz Night',
      date: 'June 25, 2023',
      location: 'Blue Note, New York',
      category: 'Music',
      description: 'Enjoy an evening of smooth jazz and great atmosphere.',
      image: 'https://picsum.photos/500/300?random=11'
    },
    {
      id: 3,
      title: 'Rock Concert',
      date: 'July 5, 2023',
      location: 'Madison Square Garden, New York',
      category: 'Music',
      description: 'Experience the energy of live rock music!',
      image: 'https://picsum.photos/500/300?random=12'
    },
    {
      id: 4,
      title: 'Classical Symphony',
      date: 'July 15, 2023',
      location: 'Symphony Hall, Boston',
      category: 'Music',
      description: 'Immerse yourself in the beauty of classical music.',
      image: 'https://picsum.photos/500/300?random=13'
    },
    
    // Technology Events
    {
      id: 5,
      title: 'Tech Conference 2023',
      date: 'July 10, 2023',
      location: 'Convention Center, San Francisco',
      category: 'Technology',
      description: 'Learn about the latest technologies and innovations.',
      image: 'https://www.conference2go.com/wp-content/uploads/2021/04/education-2.png'
    },
    {
      id: 6,
      title: 'AI Workshop',
      date: 'July 20, 2023',
      location: 'Tech Hub, San Francisco',
      category: 'Technology',
      description: 'Hands-on workshop on artificial intelligence applications.',
      image: 'https://www.conference2go.com/wp-content/uploads/2021/04/education-2.png'
    },
    {
      id: 7,
      title: 'Hackathon 2023',
      date: 'August 1, 2023',
      location: 'Innovation Center, Seattle',
      category: 'Technology',
      description: '48-hour coding challenge with amazing prizes!',
      image: 'https://img.freepik.com/premium-vector/education-concept-illustration-idea-learning-new_277904-1052.jpg?w=740'
    },
    {
      id: 8,
      title: 'Blockchain Summit',
      date: 'August 10, 2023',
      location: 'Digital Center, Austin',
      category: 'Technology',
      description: 'Explore the future of blockchain technology.',
      image: 'https://cdn.pixabay.com/photo/2016/11/12/23/34/teach-1820041_1280.jpg'
    },
    
    // Food Events
    {
      id: 9,
      title: 'Food & Wine Festival',
      date: 'August 5, 2023',
      location: 'Downtown, Chicago',
      category: 'Food',
      description: 'Taste delicious food and wine from local vendors.',
      image: 'https://tse2.mm.bing.net/th/id/OIP.YvXwVXcXy93I4uWGAcaFIAHaEr?rs=1&pid=ImgDetMain&o=7&rm=3'
    },
    {
      id: 10,
      title: 'Cooking Masterclass',
      date: 'August 15, 2023',
      location: 'Culinary Institute, Chicago',
      category: 'Food',
      description: 'Learn cooking techniques from professional chefs.',
      image: 'https://th.bing.com/th/id/R.4d001a022e077abda005c8e1880bbee6?rik=fwFKnzUHcnCXXA&riu=http%3a%2f%2fwww.famousfoodfestival.com%2fwp-content%2fuploads%2f2016%2f12%2ffamous-food-festival-about.jpg&ehk=DHTLLkQQKwHlfLeBBJ2JR1VduDW%2bwtqHcEDwj%2fn0qgs%3d&risl=&pid=ImgRaw&r=0'
    },
    {
      id: 11,
      title: 'Street Food Festival',
      date: 'August 25, 2023',
      location: 'City Park, Miami',
      category: 'Food',
      description: 'Experience diverse street food from around the world.',
      image: 'https://tse3.mm.bing.net/th/id/OIP.DswyoLznHFwxAP1Mw7U4FAHaHa?w=671&h=671&rs=1&pid=ImgDetMain&o=7&rm=3'
    },
    {
      id: 12,
      title: 'Vegan Food Fair',
      date: 'September 5, 2023',
      location: 'Green Space, Portland',
      category: 'Food',
      description: 'Discover delicious plant-based food options.',
      image: 'https://tse3.mm.bing.net/th/id/OIP.DswyoLznHFwxAP1Mw7U4FAHaHa?w=671&h=671&rs=1&pid=ImgDetMain&o=7&rm=3'
    },
    
    // Art Events
    {
      id: 13,
      title: 'Art Exhibition',
      date: 'September 20, 2023',
      location: 'Art Gallery, Los Angeles',
      category: 'Art',
      description: 'Explore beautiful artwork from talented artists.',
      image: 'https://tse1.mm.bing.net/th/id/OIP.mOeiJrrVOk2D879MnBe5BQHaE8?rs=1&pid=ImgDetMain&o=7&rm=3'
    },
    {
      id: 14,
      title: 'Photography Workshop',
      date: 'September 25, 2023',
      location: 'Photo Studio, Los Angeles',
      category: 'Art',
      description: 'Learn photography techniques from professionals.',
      image: 'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/a0588763471881.5ab1c500dc436.jpg'
    },
    {
      id: 15,
      title: 'Sculpture Exhibition',
      date: 'October 5, 2023',
      location: 'Modern Museum, New York',
      category: 'Art',
      description: 'View impressive sculptures from contemporary artists.',
      image: 'https://blogmedia.evbstatic.com/wp-content/uploads/wpmulti/sites/8/2018/01/05164316/iStock-636761588.jpg'
    },
    {
      id: 16,
      title: 'Street Art Tour',
      date: 'October 10, 2023',
      location: 'Downtown, Miami',
      category: 'Art',
      description: 'Guided tour of the city\'s best street art.',
      image: 'https://t3.ftcdn.net/jpg/02/69/00/62/360_F_269006287_UOjqqlydfZpqlXB4tSxLZGXI0MXhHytb.jpg'
    },
    
    // Sports Events
    {
      id: 17,
      title: 'Marathon 2023',
      date: 'October 15, 2023',
      location: 'City Center, Boston',
      category: 'Sports',
      description: 'Join the annual marathon and test your endurance.',
      image: 'https://eventacademy.com/wp-content/uploads/2018/06/EKqR85R.jpg'
    },
    {
      id: 18,
      title: 'Basketball Tournament',
      date: 'October 25, 2023',
      location: 'Sports Arena, Chicago',
      category: 'Sports',
      description: 'Watch exciting basketball matches between local teams.',
      image: 'https://tse3.mm.bing.net/th/id/OIP.IPI3JYdLP-GCbfYh8HjlkAHaEr?rs=1&pid=ImgDetMain&o=7&rm=3'
    },
    {
      id: 19,
      title: 'Yoga in the Park',
      date: 'November 1, 2023',
      location: 'Central Park, New York',
      category: 'Sports',
      description: 'Join a relaxing yoga session in the open air.',
      image: 'https://tse3.mm.bing.net/th/id/OIP.IPJMcwOtLJJ9rZHiJoAhrQHaFO?rs=1&pid=ImgDetMain&o=7&rm=3'
    },
    {
      id: 20,
      title: 'Swimming Competition',
      date: 'November 5, 2023',
      location: 'Aquatic Center, Los Angeles',
      category: 'Sports',
      description: 'Watch professional swimmers compete for the championship.',
      image: 'https://tse2.mm.bing.net/th/id/OIP.gd6Bs_4CKfuF14DLwGlN6gHaFj?rs=1&pid=ImgDetMain&o=7&rm=3'
    },
    
    // Business Events
    {
      id: 21,
      title: 'Business Networking Event',
      date: 'November 8, 2023',
      location: 'Grand Hotel, Seattle',
      category: 'Business',
      description: 'Connect with professionals and expand your network.',
      image: 'https://tse1.mm.bing.net/th/id/OIP.lAg2CjY-JU3iVCTIRUg8VAHaD4?rs=1&pid=ImgDetMain&o=7&rm=3'
    },
    {
      id: 22,
      title: 'Startup Pitch Competition',
      date: 'November 15, 2023',
      location: 'Innovation Hub, San Francisco',
      category: 'Business',
      description: 'Watch startups pitch their ideas to investors.',
      image: 'https://img.freepik.com/premium-photo/workshop-event-meeting-business-event-training-developrer-seminars-management_327072-19838.jpg'
    },
    {
      id: 23,
      title: 'Marketing Workshop',
      date: 'November 20, 2023',
      location: 'Business Center, New York',
      category: 'Business',
      description: 'Learn effective marketing strategies for your business.',
      image: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/business-workshop-template-design-a944b52d2178f7be2e3e0877a1dc8983_screen.jpg?ts=1682578278'
    },
    {
      id: 24,
      title: 'Leadership Conference',
      date: 'November 25, 2023',
      location: 'Convention Center, Dallas',
      category: 'Business',
      description: 'Develop your leadership skills with expert guidance.',
      image: 'https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/rm22-63-eye-01-business.jpg?w=400&dpr=1&fit=default&crop=default&auto=format&fm=pjpg&q=75&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-1.1.1&s=05238aab68e06c4ebacba570f8768c9c'
    }
  ];

  // No duplicates here

  ngOnInit() {
    this.filteredEvents = [...this.events];
    this.updateRegisteredCount();
  }

  filterEvents() {
    if (this.selectedCategory === 'all') {
      this.filteredEvents = [...this.events];
    } else {
      this.filteredEvents = this.events.filter(event => 
        event.category.toLowerCase() === this.selectedCategory.toLowerCase()
      );
    }
  }

  searchEvents(event: any) {
    this.searchTerm = event.detail.value.toLowerCase();
    this.filterEvents();
    
    if (this.searchTerm) {
      this.filteredEvents = this.filteredEvents.filter(event => 
        event.title.toLowerCase().includes(this.searchTerm) || 
        event.description.toLowerCase().includes(this.searchTerm)
      );
    }
  }

  viewEventDetails(event: any) {
    this.selectedEvent = event;
  }

  closeEventDetails() {
    this.selectedEvent = null;
  }

  registerForEvent(event: any) {
    this.registrationService.registerForEvent(event);
    this.toastMessage = `Successfully registered for ${event.title}`;
    this.isToastOpen = true;
    this.updateRegisteredCount();
  }

  unregisterFromEvent(event: any) {
    this.registrationService.unregisterFromEvent(event.id);
    this.toastMessage = `Unregistered from ${event.title}`;
    this.isToastOpen = true;
    this.updateRegisteredCount();
  }

  isRegistered(eventId: number): boolean {
    return this.registrationService.isRegistered(eventId);
  }

  updateRegisteredCount() {
    this.registeredCount = this.registrationService.getRegisteredEventCount();
  }
}
