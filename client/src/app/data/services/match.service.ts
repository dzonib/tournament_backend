import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Match } from "../models/match";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class MatchService {
  host = "http://localhost:5000";

  constructor(private http: HttpClient) {}

  getAllMatches(id): Observable<Match[]> {
    return this.http.get<Match[]>(`http://localhost:5000/matches/${id}`);
    // returns 3 matches on first go only
    // .pipe(tap(match => console.log(match)));
  }

  getMatch(idTournament, idMatch): Observable<Match> {
    return this.http.get<Match>(
      `http://localhost:5000/matches/${idTournament}/${idMatch}`
    );
  }

  updateMatchScore(
    tournamentId,
    matchId,
    scoreHome,
    scoreGuest
  ): Observable<Match[]> {
    return this.http.put<Match[]>(
      `http://localhost:5000/matches/${tournamentId}/${matchId}`,
      { scoreHome, scoreGuest }
    );
  }

  createMatch(data) {
    console.log(data);
    return this.http.post<Match>("http://localhost:5000/matches/create", data);
  }
}
