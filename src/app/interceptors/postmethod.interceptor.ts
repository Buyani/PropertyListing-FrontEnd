import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, retry, tap, throwError } from "rxjs";
import { LoaderHelper } from "../helpers/loader.helper";
import { NotificationHelper } from "../helpers/notifications.helper";
import { RegistrationResponseDto } from "../models/registrationResponseDto";


@Injectable()
export class PostInterceptorSevice implements HttpInterceptor{

    response:RegistrationResponseDto;

    constructor(private notificationHelper:NotificationHelper,
        private loaderHelper:LoaderHelper){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(req.url.includes('post')){
            return next.handle(req);
        }
        return next.handle(req).pipe(
            tap((event:HttpEvent<any>)=>{
                if(event instanceof HttpResponse){
                    this.response=event.body;
                    this.notificationHelper.setSuccessMessage(this.response.message);
                    this.loaderHelper.hideLoader();
                }
            }),
            retry(2),
            catchError((error: HttpErrorResponse) => {
                this.loaderHelper.hideLoader();
                this.notificationHelper.setErrorMessage(error.message)
                return throwError(error);
              })

        )
    }


}



