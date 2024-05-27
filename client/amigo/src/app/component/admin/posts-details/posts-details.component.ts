import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../../environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-posts-details',
  templateUrl: './posts-details.component.html',
  styleUrl: './posts-details.component.css',
})
export class PostsDetailsComponent implements OnInit {
  constructor(
    private _http: HttpClient,
    private _route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {}
  post: any;
  ngOnInit(): void {
    this._route.params.subscribe((params) => {
      const id = params['id'];
      this._http.get(`${environment.apiUrl}/post/viewPost/` + id).subscribe(
        (data) => {
          this.post = data;
        },
        (error) => {
          console.log(error);
        }
      );
    });
  }
  publishPost(id: string) {
    this._http.patch(`${environment.apiUrl}/post/publish/` + id, {}).subscribe(
      (data) => {
       this._snackBar.open('Deleted Successfully', '', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
      },
      (error) => {
        console.log(error);
      }
    );
  }
  deletePost(id: string) {
    this._http.delete(`${environment.apiUrl}/post/delete/` + id, {}).subscribe(
      (data) => {
        this.post = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
