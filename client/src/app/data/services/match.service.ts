import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Match } from "../models/match";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class MatchService {
  host = "http://localhost:5000";

  constructor(private http: HttpClient) {}

  getAllMatches(id): Observable<Match[]> {
    return this.http.get<Match[]>(`http://localhost:5000/matches/${id}`);
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
    return this.http.post<{ id: any }>(`${this.host}/matches/create`, data);
  }
}
