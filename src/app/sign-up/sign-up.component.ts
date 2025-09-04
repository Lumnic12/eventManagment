import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';  
import { IonButtons, IonCard, IonInput, IonCardContent, IonToolbar, IonCardHeader, IonContent, IonButton, IonBackButton, IonTitle, IonItem, IonLabel, IonNote, IonIcon, IonHeader } from "@ionic/angular/standalone";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

// Custom validator for password matching
function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  
  if (password && confirmPassword && password.value !== confirmPassword.value) {
    return { passwordMismatch: true };
  }
  return null;
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    FormsModule, 
    IonButtons, 
    IonCard, 
    IonInput, 
    IonCardContent, 
    IonToolbar, 
    IonCardHeader, 
    IonContent, 
    IonButton,
    IonBackButton,
    IonTitle,
    IonItem,
    IonLabel,
    IonNote,
    IonIcon,
    IonHeader,
    RouterLink
  ]
})
export class SignUpComponent implements OnInit {

  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: passwordMatchValidator });
  }

  ngOnInit() {}

  // Getters for form controls to use in the template
  get name() { return this.signupForm.get('name'); }
  get email() { return this.signupForm.get('email'); }
  get password() { return this.signupForm.get('password'); }
  get confirmPassword() { return this.signupForm.get('confirmPassword'); }

  signup() {
    if (this.signupForm.valid) {
      console.log('Form submitted:', this.signupForm.value);
      // Navigate to login page after successful signup
      this.router.navigate(['/login']);
    }
  }
}
