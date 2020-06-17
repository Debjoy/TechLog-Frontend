import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CookieService } from 'ngx-cookie-service';
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './main/nav/nav.component';
import { HomeComponent } from './main/home/home.component';
import { ProfileComponent } from './main/profile/profile.component';
import { PostComponent } from './main/post/post.component';
import { UserPostComponent } from './main/user-post/user-post.component';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { EditpostComponent } from './main/editpost/editpost.component';
import { QuillModule } from 'ngx-quill';
import { ToastrModule } from 'ngx-toastr';
import { SearchComponent } from './main/search/search.component';
import { AdminComponent } from './main/admin/admin/admin.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    ProfileComponent,
    PostComponent,
    UserPostComponent,
    MainComponent,
    LoginComponent,
    EditpostComponent,
    SearchComponent,
    AdminComponent
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    QuillModule.forRoot(),
    ToastrModule.forRoot()
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
