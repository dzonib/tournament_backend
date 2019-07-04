import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Match } from "../models/match";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class MatchService {
  constructor(private http: HttpClient) {}

  getAllMatches(id): Observable<Match[]> {
    console.log("ID FROM SERVICE" + id);
    return this.http.get<Match[]>(`http://localhost:5000/matches/${id}`);
  }
}
