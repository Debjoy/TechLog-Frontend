import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  id:any;
  postData:any;
  constructor(private route:ActivatedRoute,private postService:PostService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(
      param=>{
        this.id=param.get("id");
        this.postService.getPostById(this.id)
        .subscribe(
          res=>{this.postData=res;console.log(this.postData);this.postData.text=unescape(this.postData.text)}
        )
      })
  }

}
