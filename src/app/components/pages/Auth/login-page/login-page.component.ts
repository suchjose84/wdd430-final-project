import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import User from '../../user.model';
import AuthService from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent implements OnDestroy{
  user: User;
  errorMessage: string;
  private errorMessageSubscription: Subscription;

  constructor(private authService: AuthService){
    this.errorMessageSubscription = this.authService.errorMessageEvent
    .subscribe(message => {
      this.errorMessage = message;

    })
  }

  onLogin(form: NgForm) {
    this.errorMessage = "";
    const username = form.value.username;
    const password = form.value.password;

    this.authService.loginUser(username, password);
}

ngOnDestroy(): void {
  this.errorMessageSubscription.unsubscribe();
}

  



}
