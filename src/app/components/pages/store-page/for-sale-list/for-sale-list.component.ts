import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import StoreService from '../../store.service';
import User from '../../user.model';
import { ForSaleItem } from '../../for-sale-item.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-for-sale-list',
  templateUrl: './for-sale-list.component.html',
  styleUrls: ['./for-sale-list.component.css']
})
export class ForSaleListComponent implements OnInit, OnDestroy {
  user: User;
  items: ForSaleItem[];

  showForm: boolean = false;
  maxItemId: number;

  private userSubscription: Subscription;
  private forSaleItemsSubscription: Subscription;
  private deleteSubscription: Subscription;
  private addItemSubscription: Subscription;

  constructor(private storeService: StoreService) { }

  ngOnInit() {
    console.log('ngOnInit called');
    
    this.user = this.storeService.user;
    this.items = this.user.forSaleItems;
    console.log('Initial user:', this.user);

    this.userSubscription = this.storeService.userChangedEvent.subscribe(
      user => {
        this.user = user;
      }
    );
    
    this.forSaleItemsSubscription = this.storeService.itemsChangedEvent.subscribe(
      items => {
        this.items = items;
        console.log("updated items: ", this.items);
      }
    );

    // Subscribe to deleteItem event
    // this.deleteSubscription = this.storeService.deleteItem.subscribe(
    //   itemId => {
    //     console.log("Delete item ID received:", itemId); // Ensure this logs the item ID
    //     this.items = this.items.filter(item => item.itemId !== itemId);
    //   }
    // );

    // Subscribe to addItem event
    this.addItemSubscription = this.storeService.itemsChangedEvent.subscribe(
      items => {
        this.items = items;
        console.log("New items added: ", this.items);
      }
    );
  }

  onDeleteItem(itemId: string){
    console.log(this.user);
    console.log(itemId);
    this.storeService.deleteForSaleItem(this.user.username, itemId);
  }
  ngOnDestroy() {
    // Unsubscribe from subscriptions
    this.forSaleItemsSubscription.unsubscribe();
    this.deleteSubscription.unsubscribe();
    this.addItemSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  
}
