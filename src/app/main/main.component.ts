import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { Router } from "@angular/router";
import { LoginService } from "../login.service";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { WebSocketAPI } from '../WebSocketApi';

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
  
  notifications : any
  socket_connected = false;
  webSocketAPI: WebSocketAPI;

  @ViewChild("search_query", { static: false }) searh_query: ElementRef;

  constructor(
    private cookieService: CookieService,
    private router: Router,
    private loginService: LoginService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {

    this.notifications = 0;

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
      // start socket client otherwise ngOnDestroy will be called first
      this.webSocketAPI = new WebSocketAPI(this);
      this.connect();
      ////////////

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

  // websocket /////////////////
  ngOnDestroy(){
    if(this.socket_connected === true){
      this.disconnect();
      this.socket_connected = false;
    }
  }

  connect(){
    this.webSocketAPI._connect();
    this.socket_connected = true;
  }

  disconnect(){
    this.webSocketAPI._disconnect();
  }

  sendMessage(notifyMsg){
    this.webSocketAPI._send(notifyMsg);
  }

  handleMessage(message){
    if(message.receiver == this.cookieUsername && message.sender != this.cookieUsername)
      this.notifications = this.notifications + 1;
  }

  /////////////////////////////////

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
