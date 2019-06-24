import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./components/auth/login/login.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { AuthGuard } from './data/guards/auth-guard.guard';

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "dashboard", component: DashboardComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
