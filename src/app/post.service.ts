import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  apiURL = 'https://jsonplaceholder.typicode.com/posts';

  get_posts() {
    return this.http.get(this.apiURL);
  }

  constructor(private http: HttpClient) {}
}
