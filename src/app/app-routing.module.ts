import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { UserPostComponent } from './user-post/user-post.component';
import { PostComponent } from './post/post.component';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
    { path: '', component: MainComponent,
    children:[
        { path: 'home' , component: HomeComponent},
        { path: 'profile' , component: ProfileComponent},
        { path: 'user-post' , component: UserPostComponent},
        { path: 'post' , component: PostComponent},
        { path: '',component: HomeComponent}
    ]},
    { path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
