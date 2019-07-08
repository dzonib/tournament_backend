import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { State } from "../stores/main-store/state";
import * as jwt_decode from "jwt-decode";
import { SetUser } from "../stores/main-store";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  category: string;
  private executed: boolean;

  constructor(private store: Store<State>) {}

  canActivate(): boolean {
    return this.canFire();
  }

  canFire() {
    if (!this.executed) {
      const token = localStorage.getItem("token");
      if (token) {
        const user = jwt_decode(token);
        this.store.dispatch(new SetUser(user));

        if (user.category === "judge") {
          this.executed = true;
          return true;
        }

        this.executed = true;
        return false;
      } else {
        this.executed = true;
        return false;
      }
    }
    return true;
  }
}
