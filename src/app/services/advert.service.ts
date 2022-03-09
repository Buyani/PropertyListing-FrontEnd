import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  catchError,
  delay,
  Observable,
  of,
  retry,
  tap,
  throwError,
} from 'rxjs';
import { LoaderHelper } from '../helpers/loader.helper';
import { NotificationHelper } from '../helpers/notifications.helper';
import { Advert } from '../models/advert.model';

@Injectable({
  providedIn: 'root',
})
export class AdvertService {
  //inmemory api url
  private AdvertUrl = 'api/adverts';

  constructor(
    private http: HttpClient,
    private loaderHelper: LoaderHelper,
    private notificationHelper: NotificationHelper
  ) {}

  //get user advert by user_id
  getUserAdverts(id: number): Advert[] {
    let advertlist: Advert[];

    this.getAdverts().subscribe((adverts) => {
      advertlist = adverts.filter((p) => p.user_id === id);
    });

    return advertlist;
  }
  //get all adverts
  getAdverts(): Observable<Advert[]> {
    return this.http.get<Advert[]>(this.AdvertUrl).pipe(
      delay(2000),
      tap((adverts) => this.loaderHelper.hideLoader()),
      catchError(this.handleError)
    );
  }

  //get advert using its id
  getAdvertById(id: number): Observable<Advert> {
    //if id equals to zero initialize a new advert
    if (id === 0) {
      return of(this.InitialiseNewAdvert());
    }
    const url = `${this.AdvertUrl}/${id}`;
    return this.http.get<Advert>(url).pipe(
      delay(2000),
      tap((advert) => this.loaderHelper.hideLoader()),
      catchError(this.handleError)
    );
  }

  //Update an advert
  updateAdvert(advert:Advert):Observable<Advert>{
    const headers=new HttpHeaders({'Content-Type':'application/json'});
    const url=`${this.AdvertUrl}/${advert.id}`

    return this.http.put<Advert>(url,advert,{headers})
    .pipe(
      delay(2000),
      tap(post=> this.notificationHelper.setSuccessMessage(advert.headlineText+" updated succesfully...")),
      catchError(this.handleError)
    );
  }

  //posts a new advert
  createNewAdvert(advert: Advert): Observable<Advert> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    advert.id = null;
    return this.http.post<Advert>(this.AdvertUrl, advert, { headers }).pipe(
      delay(2000),
      tap((post) =>
        this.notificationHelper.setSuccessMessage(
          post.headlineText + ' created succesfully...'
        )
      ),
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

  InitialiseNewAdvert(): Advert {
    return {
      id: 0,
      headlineText: '',
      province: '',
      city: '',
      details: '',
      price: 0,
      user_id: 0,
    };
  }
}
