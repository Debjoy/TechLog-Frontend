import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from '../../post.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  posts: any;

  constructor(private postService: PostService, private router: Router) { }

  ngOnInit() {
    this.postService.getReportedPost().subscribe(res => {
      this.posts = res;
      this.posts.sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
    });
  }

}
