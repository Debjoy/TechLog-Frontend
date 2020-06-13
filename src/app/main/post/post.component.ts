import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { PostService } from "../post.service";
import { CookieService } from "ngx-cookie-service";
import { ToastrService } from "ngx-toastr";
import { FormControl, Validators } from "@angular/forms";
import { LoginService } from "src/app/login.service";
import { MainComponent } from "../main.component";

@Component({
  selector: "app-post",
  templateUrl: "./post.component.html",
  styleUrls: ["./post.component.css"],
})
export class PostComponent implements OnInit {
  id: any;
  postData: any;
  comments: any;
  deleteCommentId: any;
  cookieUsername: any;
  baseLocation: any;
  sharePostModal = 0;
  liked = 0;
  likeId: any;
  likesList: any;
  currentUserImg = "01.png";
  deleteCommentModal = 0;
  @ViewChild("commentText", { static: false }) commentText: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private cookieService: CookieService,
    private toastr: ToastrService,
    private loginService: LoginService,
    private mainComp: MainComponent
  ) {}

  ngOnInit() {
    this.baseLocation = window.location.origin;
    this.route.paramMap.subscribe((param) => {
      this.id = param.get("id");
      this.postService.getPostById(this.id).subscribe((res) => {
        this.postData = res;
        this.postData.text = unescape(this.postData.text);
      });
    });
    this.cookieUsername = this.cookieService.get("user");

    // get the image of current user
    this.loginService
      .getImageByUsername(this.cookieUsername)
      .subscribe((res) => {
        this.currentUserImg = res.image != null ? res.image : "01.png";
      });

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

    this.postService.getCommentsByPostid(this.id).subscribe((res) => {
      this.comments = res.reverse();
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

        // notify websocket
        this.mainComp.sendMessage({
          sender: this.cookieUsername,
          receiver: this.postData.username,
          postid: this.id,
          type: "like",
        });
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

  addComment() {
    let date = new Date();
    let body = {
      username: this.cookieUsername,
      userimage: this.currentUserImg,
      postid: this.id,
      timestamp: date.getTime(),
      text: this.commentText.nativeElement.value,
    };
    this.postService.addComment(body).subscribe((res) => {
      this.commentText.nativeElement.value = "";
      // notify websocket
      this.mainComp.sendMessage({
        sender: this.cookieUsername,
        receiver: this.postData.username,
        postid: this.id,
        type: "comment",
      });

      this.postService.getCommentsByPostid(this.id).subscribe((res) => {
        this.comments = res.reverse();
      });
    });
  }

  openDeleteModal() {
    this.deleteCommentModal = 1;
  }

  deleteComment() {
    let data = {
      id: this.deleteCommentId,
    };
    this.postService.deleteComment(data).subscribe((res) => {
      if (res == "Comment removed") {
        this.toastr.info("Comment Removed", "Removed", {
          positionClass: "toast-top-right",
        });
        this.removeFromCommentList(data.id);
      }
      this.deleteCommentModal = 0;
    });
  }
  removeFromCommentList(id_value: number) {
    this.comments = this.comments.filter((element) => {
      return element.id !== id_value;
    });
  }
  copyTextAreaToClipBoard() {
    const cleanText =
      "Checkout this article. \n" + this.baseLocation + "/post/" + this.id;
    const x = document.createElement("TEXTAREA") as HTMLTextAreaElement;
    x.value = cleanText;
    document.body.appendChild(x);
    x.select();
    document.execCommand("copy");
    document.body.removeChild(x);
    this.toastr.info("Link Copied to Clipboard", "Copied", {
      positionClass: "toast-top-right",
    });
  }
}
