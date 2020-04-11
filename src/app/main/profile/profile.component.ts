import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../login.service';
import { CookieService } from 'ngx-cookie-service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { switchMap, distinctUntilChanged, debounceTime } from 'rxjs/internal/operators';
import { PostService } from '../post.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  username: any;  
  title:any;
  editProfileModal=0;
  editPasswordModal=0;

  editNameLoading=0;
  editUsernameLoading=0;

  editPasswordLoading=0;

  form1 : any;
    form2 :any;
    form3:any;
  
  constructor(private router:Router,private loginService: LoginService,private postService:PostService,private cookieService:CookieService, private toastr: ToastrService) { }
   userDetails:any
  ngOnInit() {
    //this.getResult();
    
    var user1:any={
      username:this.cookieService.get('user')
    }
  this.loginService.findByUsername(this.cookieService.get('user'))
  .subscribe(
   res=>{//this.user=res,
    this.userDetails=res[0];
    this.form1=new FormGroup({
        rname: new FormControl (this.userDetails.name, [Validators.required])})
    this.form2 =new FormGroup({
        rusername: new FormControl (this.userDetails.username, [Validators.required])})
    this.form3=new FormGroup({
          rpassword:new FormControl(this.userDetails.password,[Validators.required,
            Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d@$!%*#?&!^]{8,}$')]),
          rcpassword: new FormControl(this.userDetails.password, [Validators.required])
          }, this.pwdMatchValidator);

    
    this.form2.controls.rusername.valueChanges.pipe(
          debounceTime(500),//change this value if required
          distinctUntilChanged(),
          switchMap(() =>{
            return this.loginService.findByUsername(this.form2.value.rusername)
          }))
          .subscribe((res:any) => {
            //console.log(res);
            if(res.length > 0) {
              this.form2.controls.rusername.setErrors({'user_name_exists': true});
            }
          });
          
 },
   err=>console.error(err)
);
  }
  
  pwdMatchValidator(frm: FormGroup){
    return frm.get('rpassword').value === frm.get('rcpassword').value ? null : {'mismatch': true};
  }

  getResult(){
    this.loginService.getResult().subscribe(res => {
      this.username= this.cookieService.get('user');
      //console.log(res.employee_name);
    });
  }

  updateName()
  {
    this.editNameLoading=1;
    let nameEmail={
    name:this.form1.value.rname,
    email:this.userDetails.email
  }
    this.loginService.updateNameByEmail(nameEmail).subscribe(
      res=>{
        this.userDetails.name=this.form1.value.rname;
        this.editProfileModal=0;
        this.editNameLoading=0;
        this.toastr.success('Name Updated', 'Awesome!',{
          positionClass:'toast-top-center'
        });
      },
      err=>console.error(err))
  }
  updateUserName()
  { 
    this.editUsernameLoading=1;
    let userEmail={
      username:this.form2.value.rusername,
      email:this.userDetails.email
    }
      this.loginService.updateUserNameByEmail(userEmail).subscribe(
        res=>{console.log(res);
        this.userDetails.username=this.form2.value.rusername;
        this.editProfileModal=0;
        this.editUsernameLoading=0;
        this.toastr.success('Username Updated', 'Awesome!',{
          positionClass:'toast-top-center'
        });
      },
        err=>console.error(err))
  }

  updatePassword()
  {
    this.editPasswordLoading=1;
    let userPass={
      password:this.form3.value.rpassword,
      email:this.userDetails.email
    }
      this.loginService.updatePasswordByEmail(userPass).subscribe(
        res=>{
          console.log(res);
          this.userDetails.password=this.form3.value.rpassword;
          this.editPasswordModal=0;
          this.editPasswordLoading=0;
          this.toastr.success('Password Updated', 'Awesome!',{
            positionClass:'toast-top-center'
          });
        },
        err=>console.error(err))
  }

  createPost()
  {
  let  post={
      image:"",
      likes:0,
      text:"",
      timestamp:new Date().getTime(),
      title:this.title,
      username:this.userDetails.username
    }

  this.postService.createPosts(post).subscribe(
    res=>{
      console.log(res);
      this.router.navigate(['edit',res]);
      this.toastr.success('New Post Created', 'Awesome!',{
        positionClass:'toast-top-center'
      });
    },
    err=>console.error(err)

  )

  
  /*this.postService.getPostById(2).subscribe(
    res=>console.log(res)
  )*/
  }

}
