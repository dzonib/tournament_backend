import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Team } from "../models/team";

@Injectable({
  providedIn: "root"
})
export class TeamsService {
  constructor(private http: HttpClient) {}

  getAllTeams(): Observable<Team[]> {
    return this.http.get<Team[]>("http://localhost:5000/teams");
  }
}
