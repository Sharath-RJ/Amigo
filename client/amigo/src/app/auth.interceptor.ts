import { HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';

export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next:HttpHandler) {
    console.log("Auth interceptor called")
    return  next.handle(req.clone({headers: req.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('token'))}));
  }
}
