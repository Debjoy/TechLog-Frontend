import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { Router } from "@angular/router";
import { LoginService } from "../login.service";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.css"],
})
export class MainComponent implements OnInit {
  private cookieToken: any;
  private cookieUsername: any;
  search_expand = false;
  openned = false;
  aboutModal = 0;
  tosModal = 0
  
  @ViewChild("search_query", { static: false }) searh_query: ElementRef;

  constructor(
    private cookieService: CookieService,
    private router: Router,
    private loginService: LoginService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.cookieToken = this.cookieService.get("token");
    this.cookieUsername = this.cookieService.get("user");
    let LoginData: any;
    this.spinner.show("spinner1");
    LoginData = {
      username: this.cookieUsername,
      token: this.cookieToken,
    };
    if (this.cookieToken == "") {
      this.router.navigate(["login"]);
    } else {
      this.loginService.existsByUsernameAndToken(LoginData).subscribe((res) => {
        if (res != true) {
          this.cookieService.set("token", "");
          this.cookieService.set("user", "");
          this.router.navigate(["login"]);
        } else {
          console.log("Logged in Successfully");
          this.toastr.success("Logged in Successfully", "Awesome!", {
            positionClass: "toast-top-right",
          });
          this.spinner.hide("spinner1");
        }
      });
    }
  }

  onSearch() {
    if (window.innerWidth >= 494 || this.search_expand) {
      let query = this.searh_query.nativeElement.value;
      query = query.trim();
      if (query.length > 0) this.router.navigate(["search", query]);
    }
    this.search_expand = !this.search_expand;
  }

  showAboutMain(){
    this.aboutModal = 1;
  }
  showTOSMain(){
    this.tosModal = 1;
  }
}
