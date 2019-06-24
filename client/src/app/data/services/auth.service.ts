import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Judge } from "../models/judge";

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

  getToken() {
    const token = localStorage.getItem("token");

    return token;
  }
}
