import { Injectable, OnInit } from "@angular/core";
import Item from './user.model';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Subject, catchError, tap, throwError } from "rxjs";
import User from "./user.model";
import { ForSaleItem } from "./for-sale-item.model";

@Injectable({
    providedIn: "root"
})

export default class StoreService{
    user: User;
    forSaleItems: ForSaleItem[];
    localUrl: string = 'http://localhost:3000';
    renderUrl: string = 'https://wdd430-final-project.onrender.com';
    url: string = this.localUrl;
    // maxItemId: number;
    userChangedEvent = new Subject<User>();
    itemsChangedEvent = new Subject<ForSaleItem[]>();
    deleteItemEvent = new Subject<string>();
    
    successMessageEvent = new Subject<string>();
    errorMessageEvent = new Subject<string>();

  constructor(private http: HttpClient) {
    
  }

  // Method to get for sale items of a specific user
  getForSaleItemsOfUser(username: string): ForSaleItem[] | null {
      if (this.user.username === username) {
          return this.user.forSaleItems;
      } else {
          return null; // User not found
    }
  
  }
  getUser(token: string) {
    if(!token) {
      return throwError(() => new Error('Token not provided'));
    }
  
    const headers = new HttpHeaders(
      { 'Content-Type': 'application/json', 
      'Authorization': `Bearer ${token}`}
    );
  
    this.http.get<User>(`${this.url}/api/user`, { headers })
      .pipe(
        catchError(error => {
          console.error('Error fetching user information: ', error);
          return throwError(() => error);
        })
      )
      .subscribe({
        next: (responseData) => {
          this.user = responseData;
          this.forSaleItems = responseData.forSaleItems;
          this.itemsChangedEvent.next(this.forSaleItems);
          this.userChangedEvent.next(this.user);
        }
      });
  }
  addForSaleItem(username: string, item: ForSaleItem) {
    if(!item || !username) {
      return throwError(() => new Error('Invalid request'));

    }
    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // Include username as a query parameter
    const url = `${this.url}/api/addItem/${username}`;

    this.http.patch<{ message: string, items: ForSaleItem[]}>(url, item, { headers })
    .pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An error occured';
        if(error.error && typeof error.error === 'object' && error.error.message){
          errorMessage = error.error.message;
        } else {
          errorMessage = `Error code: ${error.status}\nMessage: ${error.message}`;
        }
        
        this.errorMessageEvent.next(errorMessage);
        return throwError(() => new Error(errorMessage));
      })
    ).subscribe(
      {
        next: (responseData) => {
          this.user.forSaleItems = responseData.items;
          this.userChangedEvent.next(this.user);
          this.itemsChangedEvent.next(this.user.forSaleItems);

        },
        error: (error) => {
          console.error('Error adding item', error);
        }
      }
    )


  }

  deleteForSaleItem(username: string, itemId: string) {

    if(!username || !itemId) {
      return throwError(() => new Error('Invalid request'));
    }
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    
    const url = `${this.url}/api/deleteItem/${username}/${itemId}`;
  
    return this.http.delete<{ message: string, user: User }>(url, { headers })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMessage = 'An error occurred';
          if (error.error && typeof error.error === 'object' && error.error.message) {
            errorMessage = error.error.message;
          } else {
            errorMessage = `Error code: ${error.status}\nMessage: ${error.message}`;
          }
          
          this.errorMessageEvent.next(errorMessage);
          return throwError(() => new Error(errorMessage));
        })
      ).subscribe({
        next: (responseData) => {
          this.user = responseData.user;
          this.userChangedEvent.next(this.user);
          this.itemsChangedEvent.next(this.user.forSaleItems);
        }

      });
  }


}