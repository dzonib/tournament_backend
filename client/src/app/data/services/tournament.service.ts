import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Match } from "../models/match";

@Injectable({
  providedIn: "root"
})
export class TournamentService {
  host = "http://localhost:5000";

  constructor(private http: HttpClient) {}

  createTournament(data) {
    return this.http.post<{ id: any }>(
      `${this.host}/tournament/register`,
      data
    );
  }

  // finishMatch(winner: Match, loser: Match) {
  //   return this.http.put(`${this.host}/tournament`)
  // }
}
