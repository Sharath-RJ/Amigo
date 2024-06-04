import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponentComponent } from './component/login-component/login-component.component';
import { RegisterComponentComponent } from './component/register-component/register-component.component';
import { HomeComponentComponent } from './component/home-component/home-component.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
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
import { UserCardComponent } from './component/user-card/user-card.component';
import { UserListComponent } from './component/user-list/user-list.component';
import { VideocallComponent } from './component/videocall/videocall.component';
import { NotificationComponent } from './component/notification/notification.component';

import { IconSidebarMenuComponent } from './component/icon-sidebar-menu/icon-sidebar-menu.component';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { SearchComponent } from './component/search/search.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgxPaginationModule } from 'ngx-pagination';
import { AuthInterceptor } from './auth.interceptor';
import { EditPostModalComponent } from './component/edit-post-modal/edit-post-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule, MatIconAnchor } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FollowersComponent } from './component/modal/followers/followers.component';
import { FollowingComponent } from './component/modal/following/following.component';




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
    UserCardComponent,
    UserListComponent,
    VideocallComponent,
    NotificationComponent,
    IconSidebarMenuComponent,
    SearchComponent,
    EditPostModalComponent,
    FollowersComponent,
    FollowingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatTableModule,
    FilterPipeModule,
    SlickCarouselModule,
    CarouselModule,
    NgxPaginationModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
  ],

  providers: [
    provideAnimationsAsync(),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
