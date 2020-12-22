import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  @Input() public currentPost;
  @Input() public postList;

  deletePost(e, id) {
    this.postList.splice(this.postList.indexOf(this.currentPost), 1);
    this.currentPost = null;
  }

  ngOnInit(): void {}
}
