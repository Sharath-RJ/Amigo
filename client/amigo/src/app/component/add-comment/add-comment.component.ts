import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { environment } from '../../../../environment';


@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrl: './add-comment.component.css',
})
export class AddCommentComponent {
  @Input() postId: string | undefined;
  @Output() commentsAdded = new EventEmitter<any>();
  comment: string = '';
  constructor(private _http: HttpClient) {}
  addCommand() {
    console.log('add command');
  }
  addingComment() {
    const loggedInUserId = sessionStorage.getItem('loginedInUser');
   
    this._http
      .patch(`${environment.apiUrl}/post/commentPost/` + this.postId, {
        userId: loggedInUserId ? JSON.parse(loggedInUserId)._id : null,
        comment: this.comment,
      })
      .subscribe(
        (data) => {
          const commentsArray = Array.isArray(data) ? data : [data];

          this.commentsAdded.emit(commentsArray);
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
