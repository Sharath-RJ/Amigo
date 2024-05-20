import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponentComponent } from './component/login-component/login-component.component';
import { RegisterComponentComponent } from './component/register-component/register-component.component';
import { HomeComponentComponent } from './component/home-component/home-component.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NavbarComponent } from './component/navbar/navbar.component';
import { FeedComponent } from './component/feed/feed.component';
import { PostComponent } from './component/post/post.component';
import { StoriesComponent } from './component/stories/stories.component';
import { ProfileComponent } from './component/profile/profile.component';
import { ExploreComponent } from './component/explore/explore.component';
import { MenuComponent } from './component/menu/menu.component';
import { AddPostComponent } from './component/add-post/add-post.component';
import { AdminloginComponent } from './component/admin/adminlogin/adminlogin.component';
import { AdmindashboardComponent } from './component/admin/admindashboard/admindashboard.component';
import { MenuSidebarComponent } from './component/admin/menu-sidebar/menu-sidebar.component';

import { MatTableModule } from '@angular/material/table';
import { UsersListComponent } from './component/admin/users-list/users-list.component';
import { PostsListComponent } from './component/admin/posts-list/posts-list.component';
import { PostsDetailsComponent } from './component/admin/posts-details/posts-details.component';
import { AddCommentComponent } from './component/add-comment/add-comment.component';
import { ShowallCommentsComponent } from './component/showall-comments/showall-comments.component';
import { ShowallLikesComponent } from './component/showall-likes/showall-likes.component';
import { ChatComponent } from './component/chat/chat.component';
import { OtpComponent } from './component/auth/otp/otp.component';
import { OtpInputDirective } from './directive/otp-input.directive';





@NgModule({
  declarations: [
    AppComponent,
    LoginComponentComponent,
    RegisterComponentComponent,
    HomeComponentComponent,
    NavbarComponent,
    FeedComponent,
    PostComponent,
    StoriesComponent,
    ProfileComponent,
    ExploreComponent,
    MenuComponent,
    AddPostComponent,
    AdminloginComponent,
    AdmindashboardComponent,
    MenuSidebarComponent,
    UsersListComponent,
    PostsListComponent,
    PostsDetailsComponent,
    AddCommentComponent,
    ShowallCommentsComponent,
    ShowallLikesComponent,
    ChatComponent,
    OtpComponent,
    OtpInputDirective,

 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatTableModule,
  ],
  providers: [provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
