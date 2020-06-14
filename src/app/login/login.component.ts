import { Component, OnInit } from "@angular/core";
import { LoginService } from "../login.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
} from "rxjs/internal/operators";
import { CookieService } from "ngx-cookie-service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  user: any;
  //used for the login validation
  form1 = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [
      Validators.required,
      Validators.pattern("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d@$!%*#?&!^]{8,}$"),
    ]),
  });

  //used for the registration validation
  form2 = new FormGroup(
    {
      rname: new FormControl("", [Validators.required]),
      rusername: new FormControl("", [Validators.required]),
      remail: new FormControl("", [Validators.required, Validators.email]),
      rpassword: new FormControl("", [
        Validators.required,
        Validators.pattern(
          "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d@$!%*#?&!^]{8,}$"
        ),
      ]),
      rcpassword: new FormControl("", [Validators.required]),
    },
    this.pwdMatchValidator
  );

  constructor(
    private loginService: LoginService,
    private cookieService: CookieService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    // if user tries to be oversmart
    if (this.cookieService.get("token") != "") {
      this.router.navigate([""]);
    }

    //added debounceTime to make sure http calls are fired once user stops typing.
    //custorm Validator for checking if username exists or not
    this.form2.controls.rusername.valueChanges
      .pipe(
        debounceTime(500), //change this value if required
        distinctUntilChanged(),
        switchMap(() => {
          return this.loginService.findByUsername(this.form2.value.rusername);
        })
      )
      .subscribe((res: any) => {
        //console.log(res);
        if (res.length > 0) {
          this.form2.controls.rusername.setErrors({ user_name_exists: true });
        }
      });

    //custorm Validator for checking if email id exists or not
    this.form2.controls.remail.valueChanges
      .pipe(
        debounceTime(500), //change this value if required
        distinctUntilChanged(),
        switchMap(() => {
          return this.loginService.checkEmailExists(this.form2.value.remail);
        })
      )
      .subscribe((res: any) => {
        //console.log(res);
        if (res === true) {
          this.form2.controls.remail.setErrors({ email_id_exists: true });
        }
      });
  }

  //Custom Validation for password... password matching with confirm password part
  pwdMatchValidator(frm: FormGroup) {
    return frm.get("rpassword").value === frm.get("rcpassword").value
      ? null
      : { mismatch: true };
  }

  onLogin() {
    let body: any;
    body = {
      email: this.form1.value.email,
      password: this.form1.value.password,
    };

    this.loginService.existsByEmailAndPassword(body).subscribe((res) => {
      if (res.exists == "true") {
        this.cookieService.set("user", res.username);
        this.cookieService.set("token", res.tokenTimestamp);
        this.router.navigate([""]);
      } else {
        // console.error(res);
        this.toastr.error("Invalid Email and Password", "Error!", {
          positionClass: "toast-top-center",
        });
      }
    });
  }

  onRegister() {
    this.user = {
      name: this.form2.value.rname,
      email: this.form2.value.remail,
      password: this.form2.value.rpassword,
      username: this.form2.value.rusername,
    };
    let loginInfo: any; //for logging in user after the Registration is over
    loginInfo = {
      email: this.form2.value.remail,
      password: this.form2.value.rpassword,
    };
    //console.log(this.user);
    this.loginService.addUser(this.user).subscribe((res) => {
      this.toastr.success("You have registered Successfully", "Awesome!", {
        positionClass: "toast-top-center",
      });
      this.loginService.existsByEmailAndPassword(loginInfo).subscribe((res) => {
        if (res.exists == "true") {
          this.cookieService.set("user", res.username);
          this.cookieService.set("token", res.tokenTimestamp);
          this.router.navigate([""]);
        } else {
          // console.error(res);
          this.toastr.error("Invalid Email and Password", "Error!", {
            positionClass: "toast-top-center",
          });
        }
      });
    });
  }
}
