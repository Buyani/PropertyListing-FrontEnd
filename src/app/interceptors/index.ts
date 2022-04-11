import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { PostInterceptorSevice } from "./postmethod.interceptor";


export const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: PostInterceptorSevice, multi: true },
  ];