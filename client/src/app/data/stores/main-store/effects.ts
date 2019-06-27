import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { Observable } from "rxjs";
import { map, switchMap, tap } from "rxjs/operators";
import * as jwt_decode from "jwt-decode";

import { AuthService } from "../../services/auth.service";
import { SetUserRequest, ActionTypes, SetUser } from "./actions";
import { Router } from "@angular/router";

@Injectable()
export class MainEffect {
  constructor(
    private action$: Actions,
    private authService: AuthService,
    private router: Router
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
}
