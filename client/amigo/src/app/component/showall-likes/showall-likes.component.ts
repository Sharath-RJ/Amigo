import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-showall-likes',
  templateUrl: './showall-likes.component.html',
  styleUrl: './showall-likes.component.css',
})
export class ShowallLikesComponent {
  @Input() postId: string | undefined;

  likes: any[] = []; 

  constructor(private _http: HttpClient) {}

  ngOnInit(): void {
    this._http
      .get<any>('http://localhost:5000/api/post/showLikes/' + this.postId)
      .subscribe(
        (data) => {
          console.log(data.likes);
          this.likes = data.likes; 
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
