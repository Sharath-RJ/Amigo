import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../environment';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css'],
})
export class PostsListComponent implements OnInit {
  constructor(private _http: HttpClient) {}
  posts: any[] = [];
  ngOnInit(): void {
    console.log('hello');
    this._http.get(`${environment.apiUrl}/post/getPosts`).subscribe(
      (data) => {
        this.posts = data as any[];
      },
      (error) => {
        console.log(error);
      }
    );
  }

 
}
