import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-showall-comments',
  templateUrl: './showall-comments.component.html',
  styleUrl: './showall-comments.component.css',
})
export class ShowallCommentsComponent implements OnInit {
  @Input() postId: string | undefined;

  comments: any[] = []; // Explicitly type comments as an array

  constructor(private _http: HttpClient) {}

  ngOnInit(): void {
    this._http
      .get<any>('http://localhost:5000/api/post/showComments/' + this.postId)
      .subscribe(
        (data) => {
          console.log(data)
           this.comments=data.comments
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
