import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { PostService } from "../post.service";
import { LoginService } from "src/app/login.service";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"],
})
export class SearchComponent implements OnInit {
  postData: any;
  query: any;
  people: any;
  showPosts = true;

  constructor(
    private activeRoute: ActivatedRoute,
    private postService: PostService,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    this.activeRoute.paramMap.subscribe((param) => {
      //console.log(param.get("q"));
      this.query = param.get("q");
      this.postData = undefined;

      this.postService.getSearchResult(this.query).subscribe((res) => {
        // console.log(res);
        this.postData = res;
        this.postData.sort(
          (a, b) =>
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
        this.openTabNecessory();
      });

      this.loginService.getSearchedUsers(this.query).subscribe((res) => {
        this.people = res;
        this.people.sort((a, b) => a[0].localeCompare(b[0]));
        this.openTabNecessory();
      });
    });
  }

  openTabNecessory() {
    if (this.postData != undefined && this.people != undefined) {
      if (this.postData.length == 0 && this.people.length > 0) {
        this.showPosts = false;
      }
    }
  }

  //for forming url of image
  getUrl(postItem) {
    return postItem.image != null && postItem.image != ""
      ? postItem.image
      : "assets/no-image.png";
  }
}
