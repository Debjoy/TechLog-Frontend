import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../post.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-editpost',
  templateUrl: './editpost.component.html',
  styleUrls: ['./editpost.component.css']
})
export class EditpostComponent implements OnInit {
postDetails:any;
editTitleModal=0;
editPicModal=0;
id:any;
form1:any;
form2:any;
url:any;
editorForm:any;

editorStyle = {
  minHeight :'300px',
  backgroundColor: "#272727",
  border:'0'
}

  constructor(private route:ActivatedRoute,private postService:PostService,private sanitizer:DomSanitizer) { }
  
  ngOnInit() {
      this.route.paramMap.subscribe(
        param=>{
          this.id=param.get("id");
          this.postService.getPostById(this.id).subscribe(
            res=>{
              this.postDetails=res;
              console.log(this.postDetails);
              this.editorForm=new FormGroup({
                editorData:new FormControl(this.postDetails.text,null)
              });
              this.form1=new FormGroup({
                    
                    ptitle: new FormControl (this.postDetails.title, [Validators.required])
                  });
                  if(this.postDetails.image=="" ||this.postDetails.image==null)
                   this.postDetails.image="assets/no-image.png"
                   
                  this.form2=new FormGroup({
                    
                    pPic: new FormControl (this.postDetails.image, [Validators.required])
                  })
                }
            )
          }
      )
      }


      savePost()
      {
        const postData=
        {
          id:Number(this.id),
          text:this.editorForm.value.editorData+""
        }
        console.log(typeof Number(this.id));
        console.log(this.editorForm.value.editorData);
        this.postService.saveTextById(postData).
        subscribe(
          res=>console.log(res)
        )
      }

    updatePostTitle()
    {

    }

    updatePostPicUrl()
    {this.postService.updateImageById({id:this.postDetails.id,image:this.form2.value.pPic})
    .subscribe(
      res=>{console.log('success'),this.postDetails.image=this.form2.value.pPic}
    )

    }
}
