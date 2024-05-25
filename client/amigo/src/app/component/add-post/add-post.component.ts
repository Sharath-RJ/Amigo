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
  selectedFiles: File[] | null = null;
  loggedInUser: any;
  imageUrl: string | undefined;

  constructor(
    private _http: HttpClient,
    private _snackBar: MatSnackBar,
    private postService: PostService
  ) {
    const loggedInUserString = sessionStorage.getItem('loginedInUser');
    this.loggedInUser = loggedInUserString
      ? JSON.parse(loggedInUserString)
      : null;
  }

  onFilesSelected(event: any) {
    this.selectedFiles = event.target.files;
    console.log('Files selected:', this.selectedFiles); // Debugging line
  }

  onSubmit() {
    const userId = this.loggedInUser ? this.loggedInUser._id : null;
    console.log('caption', this.caption);
    console.log('logged in user', userId);
    console.log('selected files', this.selectedFiles);

    if (this.caption && this.selectedFiles && userId) {
      this.postService
        .addPost(this.caption, this.selectedFiles, userId)
        .subscribe(
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
    } else {
      console.log('Missing required arguments.');
    }
  }
}
