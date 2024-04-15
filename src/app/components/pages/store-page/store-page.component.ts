import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

import User from '../user.model';
import StoreService from '../store.service';
import { ForSaleItem } from '../for-sale-item.model';


@Component({
  selector: 'app-store-page',
  templateUrl: './store-page.component.html',
  styleUrl: './store-page.component.css'
})
export class StorePageComponent implements OnInit, OnDestroy{
  user: User;
  storeName: string = "";
  private userSubscription: Subscription;

  constructor(private storeService: StoreService){
  }

  ngOnInit(){
    const token = sessionStorage.getItem('token');

    this.storeService.getUser(token);

    this.userSubscription = this.storeService.userChangedEvent.subscribe(user => {
      this.user = user;

      if(this.user){
        this.storeName =`${this.user.firstName}'s Store`;
      }
    });
    
  }
  // onClickAddListing (){
  //   const itemName ="";

  //   this.storeService.addForSaleItem();

  // }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
  



}
