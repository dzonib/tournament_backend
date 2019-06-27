import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { Store } from "@ngrx/store";
import { State } from "../stores/main-store/state";
import { selectUser } from "../stores/main-store/selectors";
import { User } from "../models/user";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  category: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<State>
  ) {}

  canActivate(): boolean {
    this.store
      .select(selectUser)
      .subscribe((data: User) => (this.category = data.category));
    if (this.authService.loggedIn() && this.category === "judge") {
      return true;
    } else {
      this.router.navigate(["/login"]);
      return false;
    }
  }
}
