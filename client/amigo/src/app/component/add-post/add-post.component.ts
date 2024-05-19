import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from '../../../../environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css'],
})
export class AddPostComponent {
  caption: string = '';
  selectedFile: File | undefined;
  loggedInUser: any;
  imageUrl: string | undefined;

  constructor(private _http: HttpClient, private _snackBar: MatSnackBar, private postService:PostService) {
    const loggedInUserString = sessionStorage.getItem('loginedInUser');
    this.loggedInUser = loggedInUserString
      ? JSON.parse(loggedInUserString)
      : null;
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    const userId = this.loggedInUser ? this.loggedInUser._id : null;

    this.postService.addPost(this.caption, this.selectedFile, userId).subscribe(
      (data) => {
        console.log(data);
        this._snackBar.open(
          'Your Post Uploaded. Wait for admin to review your Post.',
          '',
          {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          }
        );
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
