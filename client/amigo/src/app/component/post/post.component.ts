import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output, output } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
})
export class PostComponent implements OnInit {
  showCommentBox: boolean = false;
  showcomments: boolean = false;
  showLikes: boolean = false;
  postLiked: boolean = false;
  @Output() showAllCommentsEvent = new EventEmitter<string>();
  @Output() showAllLikesEvent = new EventEmitter<string>();
  showAddComment(id: string) {
    this.showCommentBox = true;
  }

  constructor(private _http: HttpClient) {}
  posts: any = [];
  loggedInUser: string | null = sessionStorage.getItem('loggedInUser');

  ngOnInit(): void {
    console.log('Hello post');
    this._http.get('http://localhost:5000/api/post/getAllPosts').subscribe(
      (data) => {
        this.posts = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  likePost(postId: string) {
    const loggedInUserId = sessionStorage.getItem('loginedInUser');
    console.log(loggedInUserId);

    // Check if the post has already been liked by the user
    if (!this.postLiked) {
      this._http
        .patch(`http://localhost:5000/api/post/likePost/${postId}`, {
          userId: loggedInUserId ? JSON.parse(loggedInUserId)._id : null,
        })
        .subscribe(
          (data) => {
            console.log(data);
            this.postLiked = true;

            // Disable further likes for this post
            // You might want to persist this information to prevent re-likes on page refresh
          },
          (error) => {
            console.log(error);
          }
        );
    } else {
      console.log("You've already liked this post.");
    }
  }

  handleCommentsAdded(comments: any) {
    this.posts = comments;
  }

  showAllComments(id: string) {
    this.showcomments = true;
    this.showAllCommentsEvent.emit(id);
  }
  showAllLikes(id: string) {
    this.showLikes = true;
    this.showAllLikesEvent.emit(id);
  }
}
