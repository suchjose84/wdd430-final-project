import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import StoreService from '../../store.service';
import User from '../../user.model';
import { ForSaleItem } from '../../for-sale-item.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrl: './add-item.component.css'
})
export class AddItemComponent implements OnInit{
  user: User;
  // forSaleItem: ForSaleItem
  showForm: boolean = false;
  maxItemId: number;

  private userSubscription: Subscription;

  constructor(private storeService: StoreService){};

  ngOnInit(){
    // Fetch the current user
    const token = sessionStorage.getItem('token');

    this.storeService.getUser(token);

    this.userSubscription = this.storeService.userChangedEvent.subscribe(
      newUser => {
        this.user = newUser;
      }
    );
    this.storeService.getUser(sessionStorage.getItem('token'));

    
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  onAddItem(form: NgForm) {
    if(form.valid) {
      const value = form.value;
      this.maxItemId = this.user.forSaleItems.length;

      const newForSaleItem = new ForSaleItem(
        (this.maxItemId + 1 ).toString(),
        value.itemName,
        value.price,
        value.stock
      );
      this.storeService.addForSaleItem(this.user.username, newForSaleItem);
      
    }
    form.reset();
    this.toggleForm();

  }
  
}
