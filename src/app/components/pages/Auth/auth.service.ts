import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";

import User from "../user.model";
import { Subject, catchError, throwError } from "rxjs";
import { Router } from "@angular/router";

@Injectable({
    providedIn: "root"
})
export default class AuthService {
    user: User;
    successMessageEvent = new Subject<string>();
    errorMessageEvent = new Subject<string>();
    constructor(private http: HttpClient, private router: Router){}

    getToken(){
        const token = sessionStorage.getItem('token');
        return token;

    }
    getIsAuth() {
        return false;

    }


    setUser(user: User) {
        if (!user) {
            return throwError(() => new Error('User is not provided'));
        }

        const headers = new HttpHeaders({'Content-Type': 'application/json'});

        // Make the http post request to server
        this.http.post<{ message: string }>('http://localhost:3000/api/signup', user, { headers: headers })
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    let errorMessage = 'An error occured';
                    if (error.error && typeof error.error === 'object' && error.error.message) {
                        errorMessage = error.error.message;
                    } else {
                        errorMessage = `Error code: ${error.status}\nMessage: ${error.message}`;
                    }
                    this.errorMessageEvent.next(errorMessage);
                    return throwError(() => new Error(errorMessage));
                })
            )
            .subscribe(
                {
                next: (responseData) => {
                    console.log(responseData.message);
                    this.successMessageEvent.next(responseData.message);

                },
                error: (error) => {
                    console.error('Error', error);
                }

            }
                
        );
    }

    loginUser(username: string, password: string) {
        if (!username || !password) {
            return throwError(() => new Error('Please provide all required fields'));
        }
    
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const body = JSON.stringify({username, password});

        this.http.post<{ message: string, token: string }>(`http://localhost:3000/api/authenticate`, body, { headers: headers })
            .pipe(
                // map(responseData => responseData.user), // Extract user data from response
                catchError(error => {
                    let errorMessage = 'An error occurred';
                    if (error.error && typeof error.error === 'object' && error.error.message) {
                        errorMessage = error.error.message;
                    } else {
                        errorMessage = `Error code: ${error.status}\nMessage: ${error.message}`;
                    }
                    this.errorMessageEvent.next(errorMessage);
                    return throwError(() => new Error(errorMessage));
                })
            )
            .subscribe({
                next: (responseData) => {
                    // Assuming the server responds with a token upon successful authentication
                    const token = responseData.token;

                    // Store the token in session storage
                    sessionStorage.setItem('token', token);
                    this.router.navigate(['/store']);
                    
                },
                error: (error) => {
                    console.error('Error', error);
                }
            })

    }

}