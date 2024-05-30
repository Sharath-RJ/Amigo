import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environment';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  userid!: string;
  username!: string;
  following: any;
  followers: any;
  posts: Post[] = [];

  constructor(private _http: HttpClient) {}

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: [
      '<i class="fa fa-arrow-left"></i>',
      '<i class="fa fa-arrow-right"></i>',
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
    console.log('hello');
    const loggedInUser = sessionStorage.getItem('loginedInUser');
    console.log(loggedInUser);
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      this.userid = user._id;
      this.username = user.username;
      this.followers = user.followers;
      this.following = user.following;
      console.log(this.followers, this.following, this.userid, this.username);
    }

    // Getting all the posts by this user
    this._http
      .get<Post[]>(
        `${environment.apiUrl}/post/getAllPostsofUser/${this.userid}`
      )
      .subscribe(
        (data: Post[]) => {
          this.posts = data;
        },
        (error) => {
          console.log(error);
        }
      );
  }
}

interface Post {
  id: string;
  caption: string;
  image: [];
  
}
