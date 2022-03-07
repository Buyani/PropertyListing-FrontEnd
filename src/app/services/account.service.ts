import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, delay, Observable, tap, throwError } from 'rxjs';
import { LoaderHelper } from '../helpers/loader.helper';
import { NotificationHelper } from '../helpers/notifications.helper';
import { Role } from '../models/role.model';
import { User } from '../models/user.model';


@Injectable({
    providedIn: 'root'
  })
export class UserManager {
    private userUrl = 'api/users';
    private currentUserSubject: BehaviorSubject<User | null>;
    public currentUser: Observable<User>;
    

  constructor(
    private router:Router,
    private http: HttpClient,
    private notificationHelper:NotificationHelper,
    private loaderHelper:LoaderHelper
    ) {

    this.currentUserSubject = new BehaviorSubject<User>(
        JSON.parse(localStorage.getItem('currentUser'))
      );
      this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
	return this.currentUserSubject.value;
}

  //register user
  register(user: User): Observable<User> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<User>(this.userUrl, user, { headers }).pipe(
      delay(2000),
      tap((data) =>this.notificationHelper.setSuccessMessage("account was succefully created...")),
      catchError(this.handleError)
    );
  }

  //login user 
  login(username: string, password: string): boolean {
    let results=false;
      this.getUsers().subscribe((data)=>{
          let user=data.find(
            (s) =>
              s.email.toLowerCase() === username.toLowerCase() &&
              s.password.toLowerCase() === password.toLowerCase()
          );
          if(user){
              this.authenticate(user);
              this.notificationHelper.setSuccessMessage("Hi "+user.forename+" welcome back");
              this.loaderHelper.hideLoader();
              results=true;
          }
          else{
            this.notificationHelper.setErrorMessage("ERROR: username or password is incorrect...");
            this.loaderHelper.hideLoader();
            return;
          }
      })

      return results;
  }

  //logout user by clearing localstorage and naviagtes to another page
  logout(){
    console.log("LOGGING OUT");
    this.clearuser('currentUser');
    this.router.navigate(['/home']);
  }
  //aunthenticate user
  authenticate(user:any){
      //clear any logged in users first
      this.clearuser('currentUser');
      //add user to local storage
      this.saveUserToLocalStorage(user);
      //naviagtes the user to proper page
      if(user.role===Role.Admin){
        this.router.navigate(['/admin']);
      }
      else{
        this.router.navigate(['/myadverts']);
      }
     
  }
  //clear current user
  clearuser(user:string){
    localStorage.removeItem(user);
    this.currentUserSubject.next(null);
  }

  //saves current user to local storage and in subject variable
  saveUserToLocalStorage(user:User){
    this.currentUserSubject.next(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
  }
  //get users
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl).pipe(
      delay(2000),
      tap((users) => console.log("")),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Sever returned code ${err.status},error message: ${err.message}`;
    }
    return throwError(errorMessage);
  }
}
