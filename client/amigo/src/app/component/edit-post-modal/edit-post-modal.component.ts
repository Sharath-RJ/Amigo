// edit-post-modal.component.ts
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environment';

@Component({
  selector: 'app-edit-post-modal',
  templateUrl: './edit-post-modal.component.html',
  styleUrls: ['./edit-post-modal.component.css'],
})
export class EditPostModalComponent implements OnInit {
  editForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditPostModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _http:HttpClient
  ) {
    this.editForm = this.fb.group({
      caption: [data.caption],
      image: [null],
    });
    console.log(data.image);
  }
  ngOnInit() {
    console.log(this.data.image); // Access data after it's available
  }
  trackByImageId(index: number, image: any): string | undefined {
    return image._id; // Assuming image object has an id property
  }

  extractImageId(fileName: string): string {
    // Assuming the ID is the part before the first hyphen (-)
    // const parts = fileName.split('-');
    // return parts[0];
    return fileName
  }

  deleteImage(imageId: string) {
    console.log(imageId);
   if (confirm('Are you sure you want to delete this image?' + imageId)) {


    this._http
      .delete(
        `${environment.apiUrl}/post/deletePostImage/${this.data._id}/${imageId}`
      )
      .subscribe(
        (res) => {
          console.log(res);
          this.data.image = this.data.image.filter(
            (image:any) => image !== imageId
          );
        },
        (error) => {
          console.log(error);
        }
      );
      }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.editForm.patchValue({ image: file });
  }

  onSave() {
    this.dialogRef.close(this.editForm.value);
  }

  onCancel() {
    this.dialogRef.close();
  }
}
