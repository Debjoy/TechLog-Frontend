import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../login.service';
import { CookieService } from 'ngx-cookie-service';
import { PostService } from '../post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private loginService: LoginService,private router:Router,private cookieService: CookieService,private postService:PostService) { }

  title:any;
  posts: any;

  ngOnInit() {
    //this.getResult();
    this.postService.getAllPosts().subscribe(res => this.posts=res);
  }

  getResult() {
    this.loginService.getResult().subscribe(res => console.log(res));
  }

  createPost()
  {
  let  post={
      image:"",
      likes:0,
      text:"",
      timestamp:new Date().getTime(),
      title:this.title,
      username:this.cookieService.get('user')
    }

  this.postService.createPosts(post).subscribe(
    res=>{console.log(res);this.router.navigate(['edit',res])},
    err=>console.error(err)

  )
  }

}
