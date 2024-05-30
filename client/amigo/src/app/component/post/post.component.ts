import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output, output } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
})
export class PostComponent implements OnInit {
  activeCommentPostId: string | null = null;
  showcomments: boolean = false;
  showLikes: boolean = false;
  postLiked: boolean = false;
  userId!:string ;
  @Output() showAllCommentsEvent = new EventEmitter<string>();
  @Output() showAllLikesEvent = new EventEmitter<string>();

  constructor(private _http: HttpClient) {}
  posts: any = [];
  loggedInUser: string | null = sessionStorage.getItem('loggedInUser');

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: [
      '',
      '',
    ],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      740: {
        items: 1,
      },
      940: {
        items: 1,
      },
    },
    nav: true,
  };


  ngOnInit(): void {
    console.log('Hello post');
    const loggedInUserId = sessionStorage.getItem('loginedInUser');
    if(loggedInUserId) {
      this.userId = JSON.parse(loggedInUserId)._id;
    }
    this._http.get(`http://localhost:5000/api/post/getAllPosts/${this.userId}`).subscribe(
      (data) => {
        this.posts = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  showAddComment(postId: string) {
    this.activeCommentPostId = postId;
  }

  likePost(postId: string) {
    console.log("uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu",this.userId)
      this._http
        .put(`http://localhost:5000/api/post/likePost/${postId}/${this.userId}`, {
        
        })
        .subscribe(
          (data) => {
            console.log(data);
            this.postLiked = true;
          
          },
          (error) => {
            console.log(error);
          }
        );
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

