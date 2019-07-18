import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./components/auth/login/login.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { AuthGuard } from "./data/guards/auth-guard.guard";
import { LoginGuard } from "./data/guards/login.guard";

import { AppComponent } from "./app.component";
import { TournamentFormComponent } from "./components/tournament-form/tournament-form.component";
import { TournamentGraphComponent } from "./components/tournament-graph/tournament-graph.component";

const routes: Routes = [
  {
    path: "",
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "create-tournament",
    component: TournamentFormComponent,
    canActivate: [AuthGuard]
  },
  { path: "login", component: LoginComponent, canActivate: [LoginGuard] },
  { path: "tournament/:id", component: TournamentGraphComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
