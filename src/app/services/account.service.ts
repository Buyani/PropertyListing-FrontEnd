import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  delay,
  Observable,
  tap,
  throwError,
} from 'rxjs';
import { RegisterUser } from '../models/register.model';
import { User } from '../models/user.model';

const usersUrl = 'api/users';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class UserManager {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
}

  //register a new user
  registerUser(user: User): Observable<User> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<User>(usersUrl, user, { headers }).pipe(
      delay(2000),
      tap(() => console.log('User registered...')),
      catchError(this.handleError)
    );
  }
  //login user
  login(username: string, password: string): void {
    this.http.get<User[]>(usersUrl).subscribe((data) => {
      let user = data.find(
        (s) =>
          s.email.toLowerCase() === username.toLowerCase() &&
          s.password.toLowerCase() === password.toLowerCase()
      );
      if(user)
      {
        this.authenticate(user);
      }
      
    });
  }
  //logout the user
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
}

  //aunthenticates user
  authenticate(user: any) {
    //store user credentials on localstorage
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
    return user;
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
