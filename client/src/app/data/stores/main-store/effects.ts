import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { map, switchMap, tap } from "rxjs/operators";
import * as jwt_decode from "jwt-decode";

import { AuthService } from "../../services/auth.service";
import {
  SetUserRequest,
  ActionTypes,
  SetUser,
  GetAllPlayers,
  GetAllPlayersSuccess,
  GetAllTeams,
  GetAllTeamsSuccess,
  GetAllMatches,
  GetAllMatchesSuccess
} from "./actions";
import { Router } from "@angular/router";
import { PlayersService } from "../../services/players.service";
import { TeamsService } from "../../services/teams.service";
import { MatchService } from "../../services/match.service";

@Injectable()
export class MainEffect {
  constructor(
    private action$: Actions,
    private authService: AuthService,
    private router: Router,
    private playersService: PlayersService,
    private teamService: TeamsService,
    private matchService: MatchService
  ) {}

  @Effect()
  loginUser$: Observable<Action> = this.action$.pipe(
    ofType<SetUserRequest>(ActionTypes.SET_USER_REQUEST),
    switchMap((userCredentials: any) => {
      return this.authService.login(userCredentials.payload).pipe(
        tap(token => {
          localStorage.setItem("token", token);
          this.router.navigate(["/"]);
        }),
        map((token: any) => {
          const user = jwt_decode(token);
          return new SetUser(user);
        })
      );
    })
  );

  @Effect()
  loadPlayers$: Observable<Action> = this.action$.pipe(
    ofType<GetAllPlayers>(ActionTypes.GET_ALL_PLAYERS),
    switchMap(() => {
      return this.playersService.getAllPlayers().pipe(
        map((players: any) => {
          return new GetAllPlayersSuccess(players);
        })
      );
    })
  );

  @Effect()
  loadTeams$: Observable<Action> = this.action$.pipe(
    ofType<GetAllTeams>(ActionTypes.GET_ALL_TEAMS),
    switchMap(() => {
      return this.teamService.getAllTeams().pipe(
        map((teams: any) => {
          return new GetAllTeamsSuccess(teams);
        })
      );
    })
  );

  @Effect()
  loadMatchesWithSpecificTournament$: Observable<Action> = this.action$.pipe(
    ofType<GetAllMatches>(ActionTypes.GET_ALL_MATCHES),
    switchMap(data => {
      return this.matchService.getAllMatches(data.payload).pipe(
        map((matches: any) => {
          return new GetAllMatchesSuccess(matches);
        })
      );
    })
  );
}
