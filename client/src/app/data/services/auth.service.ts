import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Judge } from "../models/judge";
import * as jwt_decode from "jwt-decode";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private loginUrl = "http://localhost:5000/judge/login";
  constructor(private http: HttpClient) {}

  login({ email, password }): Observable<string> {
    return this.http.post<string>(this.loginUrl, { email, password });
  }

  loggedIn() {
    return !!localStorage.getItem("token");
  }

  decodeToken(): Judge {
    const token = localStorage.getItem("token");
    const decoded = jwt_decode(token);

    return decoded;
  }

  getToken() {
    const token = localStorage.getItem("token");

    return token;
  }
}
