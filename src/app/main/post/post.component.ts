import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { PostService } from "../post.service";
import { CookieService } from "ngx-cookie-service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-post",
  templateUrl: "./post.component.html",
  styleUrls: ["./post.component.css"],
})
export class PostComponent implements OnInit {
  id: any;
  postData: any;
  cookieUsername: any;
  liked = 0;
  likeId: any;
  likesList: any;
  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private cookieService: CookieService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((param) => {
      this.id = param.get("id");
      this.postService.getPostById(this.id).subscribe((res) => {
        this.postData = res;
        console.log(this.postData);
        this.postData.text = unescape(this.postData.text);
      });
    });
    this.cookieUsername = this.cookieService.get("user");

    this.postService.getLikeByPost(this.id).subscribe((res) => {
      console.log(res);
      this.likesList = res;
      res.forEach((element) => {
        if (element.username == this.cookieUsername) {
          this.likeId = element.id;
          this.liked = 1;
          return;
        }
      });
    });
  }

  like() {
    console.log("like pressed");
    this.postService
      .addLike({ postid: this.id, username: this.cookieUsername })
      .subscribe((res) => {
        console.log("success");
        this.likeId = res.id;
        this.liked = 1;
        this.toastr.info("You have liked this post", "Liked!", {
          positionClass: "toast-top-right",
        });
        this.addToLikedList(this.likeId, this.id, this.cookieUsername);
        console.log(this.likesList);
      });
  }

  unlike() {
    this.postService.deleteLike({ id: this.likeId }).subscribe((res) => {
      console.log("success");
      this.liked = 0;
      this.toastr.info("You have disliked this post", "Disliked!", {
        positionClass: "toast-top-right",
      });
      this.removeFromLikedList(this.likeId);
    });
  }

  addToLikedList(
    id_value: number,
    postid_value: number,
    username_value: string
  ) {
    let obj = {
      id: id_value,
      username: username_value,
      postid: postid_value,
    };
    this.likesList.push(obj);
  }
  removeFromLikedList(id_value: number) {
    this.likesList = this.likesList.filter((element) => {
      return element.id !== id_value;
    });
  }
}
