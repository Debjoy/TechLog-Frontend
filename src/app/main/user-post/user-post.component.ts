import { Component, OnInit } from "@angular/core";
import { PostService } from "../post.service";
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: "app-user-post",
  templateUrl: "./user-post.component.html",
  styleUrls: ["./user-post.component.css"],
})
export class UserPostComponent implements OnInit {
  postData: any;
  constructor(
    private postService: PostService,
    private cookieSerice: CookieService
  ) {}

  ngOnInit() {
    this.postService
      .getAllByUsername(this.cookieSerice.get("user"))
      .subscribe((res) => {
        this.postData = res;
        // console.log(res);
      });
  }
}
