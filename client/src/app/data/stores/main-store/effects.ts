import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { Observable } from "rxjs";
import { map, switchMap, tap } from "rxjs/operators";
import * as jwt_decode from "jwt-decode";

import { AuthService } from "../../services/auth.service";
import { SetUserRequest, ActionTypes, SetUser, GetAllPlayers, GetAllPlayersSuccess, GetAllTeams, GetAllTeamsSuccess } from "./actions";
import { Router } from "@angular/router";
import { PlayersService } from '../../services/players.service';
import { TeamsService } from '../../services/teams.service';

@Injectable()
export class MainEffect {
  constructor(
    private action$: Actions,
    private authService: AuthService,
    private router: Router,
    private playersService: PlayersService,
    private teamService: TeamsService,
  ) {}

  @Effect()
  loginUser$: Observable<Action> = this.action$.pipe(
    ofType<SetUserRequest>(ActionTypes.SET_USER_REQUEST),
    switchMap((userCredentials: any) => {
      return this.authService.login(userCredentials.payload).pipe(
        tap(token => {
          localStorage.setItem("token", token);
          this.router.navigate(["/dashboard"]);
        }),
        map((token: any) => {
          const user = jwt_decode(token);
          console.log("USER", user);
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
           console.log(players);
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
           console.log(teams);
          return new GetAllTeamsSuccess(teams);
        })
      );
    })
  );
}
