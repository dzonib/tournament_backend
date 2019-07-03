import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

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
}
