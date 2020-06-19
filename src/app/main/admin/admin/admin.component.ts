import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { PostService } from "../../post.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"],
})
export class AdminComponent implements OnInit {
  posts: any;

  constructor(
    private postService: PostService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.fetchReportedPosts();
  }
  fetchReportedPosts() {
    this.postService.getReportedPost().subscribe((res) => {
      this.posts = res;
      this.posts.sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
    });
  }

  resetPost(value: any) {
    this.postService.resetReportedPost(value).subscribe((res) => {
      this.toastr.info("Post has been reset", "Post Reset!");
      this.fetchReportedPosts();
    });
  }
  removePost(value: any) {
    let body = {
      id: value,
    };
    this.postService.deletePostById(body).subscribe((res) => {
      this.toastr.info("Post has been deleted", "Post Deleted!");
      this.fetchReportedPosts();
    });
  }
}
