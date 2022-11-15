import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { AuthStore } from "../service/auth.store";
import { Router } from "@angular/router";

@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthStore
  ) {
    const self = this;
    this.form = self.fb.group({
      email: ["test@angular-university.io", [Validators.required]],
      password: ["test", [Validators.required]],
      department: [{ value: "Angular", disabled: true }, [Validators.required]],
    });
  }

  ngOnInit() {}

  login() {
    const self = this;
    const val = self.form.value;
    self.auth.login(val.email, val.password).subscribe(
      () => {
        self.router.navigateByUrl("/course/)");
      },
      (err) => {
        alert("Login unsuccessfully");
        console.error(err);
      }
    );
  }
}
