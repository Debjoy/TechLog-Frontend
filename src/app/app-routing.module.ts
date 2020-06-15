import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./main/home/home.component";
import { ProfileComponent } from "./main/profile/profile.component";
import { UserPostComponent } from "./main/user-post/user-post.component";
import { PostComponent } from "./main/post/post.component";
import { MainComponent } from "./main/main.component";
import { LoginComponent } from "./login/login.component";
import { EditpostComponent } from "./main/editpost/editpost.component";
import { SearchComponent } from "./main/search/search.component";

const routes: Routes = [
  {
    path: "",
    component: MainComponent,
    children: [
      { path: "home", component: HomeComponent },
      { path: "profile/:id", component: ProfileComponent },
      { path: "profile", component: ProfileComponent },
      { path: "user-post", component: UserPostComponent },
      { path: "edit/:id", component: EditpostComponent },
      { path: "edit", redirectTo: "" },
      { path: "post/:id", component: PostComponent },
      { path: "post", redirectTo: "" },
      { path: "search/:q", component: SearchComponent },
      { path: "search", redirectTo: "" },
      { path: "", component: HomeComponent },
    ],
  },
  { path: "login", component: LoginComponent },
  { path: "**", component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
