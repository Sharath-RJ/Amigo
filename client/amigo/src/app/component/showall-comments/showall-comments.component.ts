import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-showall-comments',
  templateUrl: './showall-comments.component.html',
  styleUrl: './showall-comments.component.css',
})
export class ShowallCommentsComponent implements OnChanges {
  @Input() postId: string | undefined;
  @Input() comments: any[] = []; // Explicitly type comments as an array
  comment:any[]=[]

  constructor(private _http: HttpClient) {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges called with changes:', changes);
    this.comment=[]
    if (changes['postId'] && this.postId) {
     this.loadComments();
    }
    if (changes['comments']) {
      console.log('Comments updated:', this.comments); 
     // this.loadComments();// Log updated comments
    }
  }

  loadComments(): void {
    this._http
      .get<any>('http://localhost:5000/api/post/showComments/' + this.postId)
      .subscribe(
        (data) => {
          this.comment = data.comments;
          console.log('Comments loaded:', this.comments); // Log loaded comments
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
