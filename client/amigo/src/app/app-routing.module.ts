import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponentComponent } from './component/login-component/login-component.component';
import { RegisterComponentComponent } from './component/register-component/register-component.component';
import { HomeComponentComponent } from './component/home-component/home-component.component';
import { AddPostComponent } from './component/add-post/add-post.component';
import { AdmindashboardComponent } from './component/admin/admindashboard/admindashboard.component';
import { AdminloginComponent } from './component/admin/adminlogin/adminlogin.component';
import { PostsDetailsComponent } from './component/admin/posts-details/posts-details.component';
import { ChatComponent } from './component/chat/chat.component';
import { OtpComponent } from './component/auth/otp/otp.component';
import { UserListComponent } from './component/user-list/user-list.component';
import { VideocallComponent } from './component/videocall/videocall.component';
import { NotificationComponent } from './component/notification/notification.component';
import { ProfileComponent } from './component/profile/profile.component';
import { LiveStreamComponent } from './component/live-stream/live-stream.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponentComponent },
  { path: 'register', component: RegisterComponentComponent },
  { path: 'home', component: HomeComponentComponent },
  { path: 'addPost', component: AddPostComponent },
  { path: 'adminDashboard', component: AdmindashboardComponent },
  { path: 'admin', component: AdminloginComponent },
  { path: 'viewPost/:id', component: PostsDetailsComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'otpVerify', component: OtpComponent },
  { path: 'network', component: UserListComponent },
  { path: 'chat/:receiverId', component: ChatComponent },
  { path: 'videocall/:roomId', component: VideocallComponent },
  { path: 'notifications', component: NotificationComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'liveStream', component:LiveStreamComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
