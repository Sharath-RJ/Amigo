import { Component } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service.service';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrl: './home-component.component.css',
})
export class HomeComponentComponent {
  constructor(private authservice: AuthServiceService) {}
  name: string = '';
  picture: string = '';

  ngOnInit() {
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    if (loggedInUser) this.name = JSON.parse(loggedInUser).name;
    const ProfilePic = sessionStorage.getItem('loggedInUser');
    if (ProfilePic) this.picture = JSON.parse(ProfilePic).picture;
  }

  signOut() {
    this.authservice.signOut();
  }
}
