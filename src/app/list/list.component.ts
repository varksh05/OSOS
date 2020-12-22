import { PostService } from './../post.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
  result: string = '';
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
        filesize: this.result,
      };
      this.postList.push(data);
      this.newPostForm.reset();
      this.result = '';
      this.onSubmitted = false;
    }
  }

  onFileSelector(e) {
    this.result = '';
    var select = e.target.files;
    if (select.length < 4) {
      for (let i = 0; i < select.length; i++) {
        if (select[i].size < 2000001) {
          this.result +=
            '<br><span class="text-strong">' + select[i].name + '</span> ';
          this.result +=
            ' <span class="text-muted">(' +
            Math.floor(select[i].size / 10000) / 100 +
            'MB)</span>';
        } else {
          alert('Image Size should be below 2Mb');
        }
      }
    } else {
      alert('Select between 1 - 3 images');
    }
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
