import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild, viewChild } from '@angular/core';
import { environment } from '../../../../environment';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;
  userid!: string;
  username!: string;
  following: any;
  followers: any;
  posts: Post[] = [];
  profilePic: string = '';

  constructor(private _http: HttpClient) {}

  onProfilePicClick() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target && target.files && target.files.length > 0) {
      const file = target.files[0];
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'Amigo-Project'); // Ensure this preset is correctly set in Cloudinary

      this._http
        .post<{ secure_url: string }>(
          'https://api.cloudinary.com/v1_1/djbvjenjy/image/upload',
          formData
        )
        .subscribe(
          (response:any) => {
            console.log(response.url)
            this._http
              .put<{ profilePic :string}>(
                `${environment.apiUrl}/user/updateProfilePic/${this.userid}`,
                { profilePic: response.url }
              )
              .subscribe((data) => {
                console.log(data);
                this.profilePic = data.profilePic;
              });
          },
          (error:any) => {
            console.error('Upload error:', error);
          }
        );
    }
  }

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
      this.profilePic = user.profilePic;
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
