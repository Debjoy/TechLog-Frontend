import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { Router } from "@angular/router";
import { LoginService } from "../login.service";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { WebSocketAPI } from "../WebSocketApi";

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
  tosModal = 0;
  openNotificationPanel = false;

  notifications = [];
  notifications_count: any;
  socket_connected = false;
  webSocketAPI: WebSocketAPI;

  @ViewChild("search_query", { static: false }) search_query: ElementRef;

  constructor(
    private cookieService: CookieService,
    private router: Router,
    private loginService: LoginService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.notifications_count = 0;

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
      this.loginService.wakeUp().subscribe((res) => {
        this.connect();
      });
      ////////////

      this.loginService.existsByUsernameAndToken(LoginData).subscribe((res) => {
        if (res != true) {
          this.cookieService.set("token", "");
          this.cookieService.set("user", "");
          this.router.navigate(["login"]);
        } else {
          // console.log("Logged in Successfully");
          this.toastr.success("Logged in Successfully", "Awesome!", {
            positionClass: "toast-top-right",
          });
          this.spinner.hide("spinner1");
        }
      });

      this.loginService
        .getAllByReceiver(this.cookieUsername)
        .subscribe((res) => {
          res.forEach((element) => {
            this.handleMessage(element);
          });
        });
    }
  }

  // websocket /////////////////
  ngOnDestroy() {
    if (this.socket_connected === true) {
      this.disconnect();
      this.socket_connected = false;
    }
  }

  connect() {
    this.webSocketAPI._connect();
    this.socket_connected = true;
  }

  disconnect() {
    this.webSocketAPI._disconnect();
  }

  sendMessage(notifyMsg) {
    this.webSocketAPI._send(notifyMsg);
  }

  handleMessage(message) {
    //checking if notification is for user or not
    if (
      message.receiver == this.cookieUsername &&
      message.sender != this.cookieUsername
    ) {
      let present_in_notification_menu = false;
      let notification_items = [];
      //to check if local list of notification contains some data or not
      if (this.notifications.length > 0) {
        //looping notifiactions for checking if notification of type and post id exsits or not
        this.notifications.forEach(function (notification) {
          if (
            notification.type === message.type &&
            notification.postid === message.postid
          ) {
            present_in_notification_menu = true;
            let same_post_notification = false;
            let notification_senders = notification.sender;

            //checking if same user has already liked before
            notification_senders.forEach(function (element) {
              if (element === message.sender) {
                same_post_notification = true;
              }
            });

            //if same user has already liked before then ignore that like or.. else add the like.
            if (!same_post_notification) {
              notification_senders.push(message.sender);
            }
            let notify = {
              sender: notification_senders,
              postid: notification.postid,
              type: notification.type,
            };
            notification_items.push(notify);
          } else {
            notification_items.push(notification);
          }
        });
        //updating global notifications array with updated local notification list.
        this.notifications = notification_items;
      }

      //if there is no common notifications present. then simply add the
      //notification in the global notification array
      if (!present_in_notification_menu) {
        let notify = {
          sender: [message.sender],
          postid: message.postid,
          type: message.type,
        };
        this.notifications.reverse();
        this.notifications.push(notify);
        this.notifications.reverse();

        let audio = new Audio("assets/audio/pop.mp3");
        audio.play().catch((onRejected) => {});
        this.notifications_count = this.notifications_count + 1;
      }

      // console.log(
      //   "notifications are as follows \n" + JSON.stringify(this.notifications)
      // );
    }
  }

  toggleNotificationPanel() {
    this.openNotificationPanel = !this.openNotificationPanel;
    this.notifications_count = 0;
    if (this.openNotificationPanel == false)
      this.loginService
        .deleteByReceiver(this.cookieUsername)
        .subscribe((res) => {});
  }

  /////////////////////////////////

  onSearch() {
    if (window.innerWidth >= 494 || this.search_expand) {
      let query = this.search_query.nativeElement.value;
      query = query.trim();
      if (query.length > 0) this.router.navigate(["search", query]);
    }
    this.search_expand = !this.search_expand;
  }

  showAboutMain() {
    this.aboutModal = 1;
  }
  showTOSMain() {
    this.tosModal = 1;
  }
}
