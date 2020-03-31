import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../post.service';

@Component({
  selector: 'app-editpost',
  templateUrl: './editpost.component.html',
  styleUrls: ['./editpost.component.css']
})
export class EditpostComponent implements OnInit {
postDetails:any;
editTitleModal=0;
id:any;
form1:any;
editorData ='<p>This is a post have fun reading this post.</p>';

  constructor(private route:ActivatedRoute,private postService:PostService) { }
  
  ngOnInit() {
      this.route.paramMap.subscribe(
        param=>{
          this.id=param.get("id");
          this.postService.getPostById(this.id).subscribe(
            res=>{
              this.postDetails=res;
              console.log(this.postDetails);
              this.editorData=this.postDetails.text;
              this.form1=new FormGroup({
                    ptitle: new FormControl (this.postDetails.title, [Validators.required])
                  })
                }
            )

      
          }
      )
      }
}
