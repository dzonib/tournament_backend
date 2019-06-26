import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import * as jwt_decode from "jwt-decode";
import { User } from '../models/user';

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private loginUrl = "http://localhost:5000/judge/login";
  constructor(private http: HttpClient) {}

  login({ username, password }): Observable<string> {

    return this.http.post<string>(this.loginUrl, { username, password });
  }

  loggedIn() {
    return !!localStorage.getItem("token");
  }

  decodeToken(): User {
    const token = localStorage.getItem("token");
    const decoded = jwt_decode(token);

    return decoded;
  }

  getToken() {
    const token = localStorage.getItem("token");

    return token;
  }
}
