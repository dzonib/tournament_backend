import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { AuthService } from "src/app/data/services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-auth",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl(""),
    password: new FormControl("")
  });

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  submitHandler() {
    this.authService.login(this.loginForm.value).subscribe(token => {
      localStorage.setItem("token", token);
      this.router.navigate(["/dashboard"]);
    });
  }
}
