import { Component, OnInit } from "@angular/core";
import { LoginService } from "../../login.service";
import { CookieService } from "ngx-cookie-service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { PostService } from "../post.service";
import { Router, ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { parseTemplate } from "@angular/compiler";
@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit {
  username: any;
  title: any;
  editProfileModal = 0;
  editPasswordModal = 0;
  editProfilePic = 0;

  editNameLoading = 0;
  editUsernameLoading = 0;

  editPasswordLoading = 0;

  form1: any;
  form2: any;
  form3: any;

  selectedImg: string;
  userImg: string;
  allImg: string[];

  constructor(
    private router: Router,
    private loginService: LoginService,
    private postService: PostService,
    private cookieService: CookieService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {}
  userDetails: any;
  cookieUserName: any;
  foreignUser = true;
  loadUser: any;
  postData: any;
  ngOnInit() {
    //this.getResult();
    this.allImg = [
      "01.png",
      "02.png",
      "03.png",
      "04.png",
      "05.png",
      "06.png",
      "07.png",
      "08.png",
      "09.png",
      "10.png",
      "11.png",
      "12.png",
      "13.png",
      "14.png",
      "15.png",
      "16.png",
      "17.png",
      "18.png",
      "19.png",
      "20.png",
      "21.png",
      "22.png",
      "23.png",
      "24.png",
      "25.png",
      "26.png",
      "27.png",
      "28.png",
      "29.png",
      "30.png",
      "31.png",
      "32.png",
      "33.png",
      "34.png",
      "35.png",
      "36.png",
      "37.png",
      "38.png",
      "39.png",
      "40.png",
      "41.png",
      "42.png",
      "43.png",
      "44.png",
      "45.png",
      "46.png",
      "47.png",
      "48.png",
      "49.png",
      "50.png",
      "51.png",
      "52.png",
      "53.png",
      "54.png",
      "55.png",
      "56.png",
      "57.png",
      "58.png",
      "59.png",
      "60.png",
      "61.png",
      "62.png",
      "63.png",
      "64.png",
      "65.png",
      "66.png",
      "67.png",
      "68.png",
      "69.png",
      "70.png",
      "71.png",
      "72.png",
      "73.png",
      "74.png",
      "75.png",
      "76.png",
      "77.png",
      "78.png",
      "79.png",
      "80.png",
      "81.png",
    ];
    this.userImg = this.allImg[0];
    this.selectedImg = this.userImg;

    this.cookieUserName = this.cookieService.get("user");

    this.route.paramMap.subscribe((param) => {
      if (param.has("id")) {
        let paramUser = param.get("id");
        if (paramUser === this.cookieUserName) {
          this.loadUser = this.cookieUserName;
          this.foreignUser = false;
        } else {
          this.loadUser = paramUser;
          this.foreignUser = true;
          //load foreign user's post
          this.postService.getAllByUsername(this.loadUser).subscribe((res) => {
            this.postData = res;
          });
        }
      } else {
        console.log("inside");
        this.loadUser = this.cookieUserName;
        this.foreignUser = false;
      }

      this.loginService.findByUsername(this.loadUser).subscribe(
        (res) => {
          //this.user=res,
          if (res.length < 1) {
            this.router.navigate(["profile"]);
            return;
          }
          this.userDetails = res[0];
          this.form1 = new FormGroup({
            rname: new FormControl(this.userDetails.name, [
              Validators.required,
            ]),
          });
          this.form3 = new FormGroup(
            {
              rpassword: new FormControl(this.userDetails.password, [
                Validators.required,
                Validators.pattern(
                  "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d@$!%*#?&!^]{8,}$"
                ),
              ]),
              rcpassword: new FormControl(this.userDetails.password, [
                Validators.required,
              ]),
            },
            this.pwdMatchValidator
          );
        },
        (err) => console.error(err)
      );
    });
  }

  pwdMatchValidator(frm: FormGroup) {
    return frm.get("rpassword").value === frm.get("rcpassword").value
      ? null
      : { mismatch: true };
  }

  getResult() {
    this.loginService.getResult().subscribe((res) => {
      this.username = this.cookieService.get("user");
      //console.log(res.employee_name);
    });
  }

  updateName() {
    this.editNameLoading = 1;
    let nameEmail = {
      name: this.form1.value.rname,
      email: this.userDetails.email,
    };
    this.loginService.updateNameByEmail(nameEmail).subscribe(
      (res) => {
        this.userDetails.name = this.form1.value.rname;
        this.editProfileModal = 0;
        this.editNameLoading = 0;
        this.toastr.success("Name Updated", "Awesome!", {
          positionClass: "toast-top-center",
        });
      },
      (err) => console.error(err)
    );
  }

  updatePassword() {
    this.editPasswordLoading = 1;
    let userPass = {
      password: this.form3.value.rpassword,
      email: this.userDetails.email,
    };
    this.loginService.updatePasswordByEmail(userPass).subscribe(
      (res) => {
        console.log(res);
        this.userDetails.password = this.form3.value.rpassword;
        this.editPasswordModal = 0;
        this.editPasswordLoading = 0;
        this.toastr.success("Password Updated", "Awesome!", {
          positionClass: "toast-top-center",
        });
      },
      (err) => console.error(err)
    );
  }

  createPost() {
    let post = {
      image: "",
      likes: 0,
      text: "",
      timestamp: new Date().getTime(),
      title: this.title,
      username: this.userDetails.username,
    };

    this.postService.createPosts(post).subscribe(
      (res) => {
        console.log(res);
        this.router.navigate(["edit", res]);
        this.toastr.success("New Post Created", "Awesome!", {
          positionClass: "toast-top-center",
        });
      },
      (err) => console.error(err)
    );

    /*this.postService.getPostById(2).subscribe(
    res=>console.log(res)
  )*/
  }

  openImagePickerModal() {
    this.selectedImg = this.userImg;
    this.editProfilePic = 1;
  }
  saveImagePickerImg() {
    console.log(this.selectedImg);

    //after transation is over

    /*this.editProfilePic = 1;*/
  }
}
