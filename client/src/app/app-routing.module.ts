import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./components/auth/login/login.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { AuthGuard } from './data/guards/auth-guard.guard';
import { LoginGuard } from './data/guards/login.guard';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: "", component: DashboardComponent, canActivate: [AuthGuard] },
  { path: "login", component: LoginComponent, canActivate: [LoginGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
