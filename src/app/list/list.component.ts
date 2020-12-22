import { PostService } from './../post.service';
import { Component, OnInit, Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { fileURLToPath } from 'url';

interface Post {
  id: number;
  userid: number;
  title: string;
  body: string;
  filesize: any;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  public nameList = ['Adhi', 'Varun Akash', 'Ramesh', 'Jagan', 'Preetha'];
  public currentPost = '';
  public postList: Post[] = [];
  addCancelBtn: string = 'Add Post';
  showAddPostForm: Boolean = false;
  onSubmitted = false;
  showDelete = false;
  selectedFile: any;
  newPostForm = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(150),
    ]),
    post: new FormControl('', [Validators.required, Validators.minLength(2)]),
  });

  newBtn(e, name) {
    this.showAddPostForm = false;
    this.addCancelBtn = 'Add Post';
    this.showDelete = true;
    this.currentPost = name;
  }

  toggleAddPost() {
    this.showAddPostForm = !this.showAddPostForm;
    this.addCancelBtn = !this.showAddPostForm ? 'Add Post' : 'Cancel';
  }

  onSubmit() {
    this.onSubmitted = true;
    if (!this.newPostForm.valid) {
      return false;
    } else {
      const data = {
        id:
          this.postList != []
            ? this.postList[this.postList.length - 1].id + 1
            : 0,
        userid: Math.floor(Math.random() * 10),
        title: this.newPostForm.get('title').value,
        body: this.newPostForm.get('post').value,
        filesize:
          this.selectedFile.name +
          ' (' +
          Math.floor(this.selectedFile.size / 10000) / 100 +
          ' MB)',
      };
      this.postList.push(data);
      this.newPostForm.reset();
      this.onSubmitted = false;
    }
  }

  onFileSelector1(e) {
    if (e.target.files[0].size > 2000001) {
      alert('File size should be below 2MB');
      e.target.files.pop();
      return;
    }
    this.selectedFile = <File>e.target.files[0];
  }

  constructor(private postService: PostService) {
    this.postService.get_posts().subscribe((res: Post[]) => {
      for (let index = 0; index < 8; index++) {
        this.postList.push(res[index]);
      }
    });
  }

  ngOnInit(): void {}
}
