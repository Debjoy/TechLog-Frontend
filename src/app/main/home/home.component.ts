import { Component, OnInit } from "@angular/core";
import { LoginService } from "../../login.service";
import { CookieService } from "ngx-cookie-service";
import { PostService } from "../post.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  constructor(
    private loginService: LoginService,
    private router: Router,
    private cookieService: CookieService,
    private postService: PostService
  ) {}

  title_create: any;
  posts: any;
  followedPost: any;
  showTopPosts = true;
  cookieUsername: any;

  ngOnInit() {
    //this.getResult();
    this.cookieUsername = this.cookieService.get("user");
    this.postService.getAllPosts().subscribe((res) => {
      this.posts = res;
      this.posts.sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
    });
    this.postService.getFollowersPost(this.cookieUsername).subscribe((res) => {
      this.followedPost = res;
      this.followedPost.sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
    });
  }

  // getResult() {
  //   this.loginService.getResult().subscribe((res) => console.log(res));
  // }

  createPost() {
    let post = {
      image: "",
      likes: 0,
      comments: 0,
      text: "",
      timestamp: new Date().getTime(),
      title: this.title_create,
      username: this.cookieService.get("user"),
    };

    this.postService.createPosts(post).subscribe(
      (res) => {
        // console.log(res);
        this.router.navigate(["edit", res]);
      }
      // (err) => console.error(err)
    );
  }

  getUrl(postItem) {
    return postItem.image != null && postItem.image != ""
      ? postItem.image
      : "assets/no-image.png";
  }
}
