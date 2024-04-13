import { Component, OnDestroy } from '@angular/core';
import AuthService from '../auth.service';
import { NgForm } from '@angular/forms';
import User from '../../user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrl: './sign-up-page.component.css'
})
export class SignUpPageComponent implements OnDestroy{
  user: User;
  successMessage: string;
  errorMessage: string;
  private successMessageSubscription: Subscription;
  private errorMessageSubscription: Subscription;

  constructor(private authService: AuthService) {
    this.successMessageSubscription = this.authService.successMessageEvent.subscribe(message => {
      this.successMessage = message;
    });
    this.errorMessageSubscription = this.authService.errorMessageEvent.subscribe(message => {
      this.errorMessage = message;
    });
  }

  onSubmit(form: NgForm){
    this.successMessage = "";
    this.errorMessage = "";
    
    const value = form.value;

    const newUser = new User(
      value.username,
      value.email,
      value.password,
      value.firstName,
      value.lastName,
      "",
      [],
    );
    this.authService.setUser(newUser);
    

  }

  ngOnDestroy(): void {
    this.successMessageSubscription.unsubscribe();
    this.errorMessageSubscription.unsubscribe();
  }

}
