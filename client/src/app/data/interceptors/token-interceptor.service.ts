import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler
} from "@angular/common/http";
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: "root"
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // CHECK IF THERE IS A TOKEN IN LS
    const token = this.authService.getToken();

    const modifiedReq = req.clone({
      setHeaders: {
        ["x-auth-token"]: token ? token : ""
      }
    });

    return next.handle(modifiedReq);
  }
}
