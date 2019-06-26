import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms";
import { AuthService } from "src/app/data/services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-auth",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl("", [
      Validators.required,
      Validators.minLength(4)
    ]),
    password: new FormControl("", Validators.required)
  });

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  public hasError = (controlName, errorName) => {
    return this.loginForm.controls[controlName].hasError(errorName);
  };

  submitHandler() {
    this.authService.login(this.loginForm.value).subscribe(token => {
      console.log(this.loginForm.value);
      console.log(token);
      localStorage.setItem("token", token);
      this.router.navigate(["/dashboard"]);
    });
  }
}
