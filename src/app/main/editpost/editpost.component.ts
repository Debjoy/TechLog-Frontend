import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { PostService } from "../post.service";
import { ToastrService } from "ngx-toastr";
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: "app-editpost",
  templateUrl: "./editpost.component.html",
  styleUrls: ["./editpost.component.css"],
})
export class EditpostComponent implements OnInit {
  postDetails: any;
  editTitleModal = 0;
  editPicModal = 0;
  deletePostModal = 0;
  id: any;
  form1: any;
  form2: any;
  url: any;
  editorForm: any;
  editModalLoading = 0;
  savePostTextLoad = 0;

  editor: any;

  cookieUsername: any;

  editorStyle = {
    minHeight: "300px",
    backgroundColor: "#272727",
    border: "0",
  };

  editorOptions = {
    toolbar: [
      ["bold", "italic", "underline", "strike"], // toggled buttons
      ["blockquote", "code-block"], //

      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }], // superscript/subscript
      [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
      [{ direction: "rtl" }], // text direction

      [{ size: ["small", false, "large", "huge"] }], // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],

      ["clean"], // remove formatting button

      ["link"], // link and image, video ["link", "image", "video"]
    ],
  };

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private toastr: ToastrService,
    private cookieService: CookieService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cookieUsername = this.cookieService.get("user");
    this.route.paramMap.subscribe((param) => {
      this.id = param.get("id");
      this.postService.getPostById(this.id).subscribe((res) => {
        this.postDetails = res;
        if (this.postDetails.username != this.cookieUsername) {
          this.toastr.error(
            "You can not edit someone else post",
            "Unauthorized!"
          );
          this.router.navigate([""]);
        }
        this.editorForm = new FormGroup({
          editorData: new FormControl(this.postDetails.text, null),
        });
        this.form1 = new FormGroup({
          ptitle: new FormControl(this.postDetails.title, [
            Validators.required,
          ]),
        });
        if (this.postDetails.image == "" || this.postDetails.image == null)
          this.postDetails.image = "assets/no-image.png";

        this.form2 = new FormGroup({
          pPic: new FormControl(this.postDetails.image, [Validators.required]),
        });
      });
    });
  }

  savePost() {
    this.savePostTextLoad = 1;
    const postData = {
      id: Number(this.id),
      text: this.editorForm.value.editorData + "",
    };
    // console.log(typeof Number(this.id));
    // console.log(this.editorForm.value.editorData);
    this.postService.saveTextById(postData).subscribe((res) => {
      // console.log(res);
      this.savePostTextLoad = 0;
      this.toastr.success("Post saved ", "Awesome!");
    });
  }

  updatePostTitle() {
    this.toastr.success("Title Updated", "Awesome!", {
      positionClass: "toast-top-center",
    });
  }

  updatePostPicUrl() {
    this.editModalLoading = 1; //For Loading Animation
    this.postService
      .updateImageById({
        id: this.postDetails.id,
        image: this.form2.value.pPic,
      })
      .subscribe((res) => {
        // console.log("success");
        this.editModalLoading = 0;
        this.postDetails.image = this.form2.value.pPic;
        this.toastr.success("Post Image Updated", "Awesome!", {
          positionClass: "toast-top-left",
        });
      });
  }

  deletePost() {
    let body = { id: this.id };
    this.postService.deletePostById(body).subscribe(
      (res) => {
        // console.log("success");
        this.router.navigate(["/user-post"]);
      }
      // err=>console.error(err)
    );
  }

  publishPost() {
    this.postService.publishById(this.postDetails.id).subscribe((res) => {
      if (res == 1) {
        this.toastr.info("The Post has been made public", "Published!", {
          positionClass: "toast-top-left",
        });
        this.postDetails.privacy = 1;
      }
    });
  }
  unpublishPost() {
    this.postService.unpublishById(this.postDetails.id).subscribe((res) => {
      if (res == 1) {
        this.toastr.info("The Post has been made private", "Unpublished!", {
          positionClass: "toast-top-left",
        });
        this.postDetails.privacy = 0;
      }
    });
  }

  //editor focus
  onFocus($event) {
    // tslint:disable-next-line:no-console
    this.editor.focus();
  }

  setEditor(editorQuil) {
    this.editor = editorQuil;
  }
}
