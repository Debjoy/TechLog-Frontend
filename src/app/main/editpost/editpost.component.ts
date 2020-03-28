import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-editpost',
  templateUrl: './editpost.component.html',
  styleUrls: ['./editpost.component.css']
})
export class EditpostComponent implements OnInit {
postDetails:any;
editTitleModal=0;

editorData ='<p>This is a post have fun reading this post.</p>';

  constructor() { }
  form1=new FormGroup({
    ptitle: new FormControl ('heading', [Validators.required])})
  ngOnInit() {

  }

}
