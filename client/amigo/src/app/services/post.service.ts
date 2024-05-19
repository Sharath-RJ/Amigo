import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private _http:HttpClient) { }

   addPost(caption: string, selectedFile: File | undefined, userId: string | null) {
    const formData = new FormData();
    formData.append('caption', caption);
    if (selectedFile) {
      formData.append('image', selectedFile);
    }
    formData.append('user', userId || '');

    return this._http.post<any>(`${environment.apiUrl}/post/addPost`, formData);
  }
}
