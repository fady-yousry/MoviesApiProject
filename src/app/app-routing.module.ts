import { StardetailsComponent } from './stardetails/stardetails.component';
import { TvdetailsComponent } from './tvdetails/tvdetails.component';
import { MoviedetailsComponent } from './moviedetails/moviedetails.component';
import { AuthGuard } from './authentication/auth.guard';
import { RegistrationComponent } from './authentication/registration/registration.component';
import { LoginComponent } from './authentication/login/login.component';
import { NotFound404Component } from './not-found404/not-found404.component';
import { TvComponent } from './tv/tv.component';
import { MoviesComponent } from './movies/movies.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StarsComponent } from './stars/stars.component';



const routes: Routes = [
  {path:"",redirectTo:"home",pathMatch:"full"},
  {path:"home",canActivate:[AuthGuard],component:HomeComponent},
  {path:"movies",canActivate:[AuthGuard],component:MoviesComponent},
  {path:"moviedetails/:id",canActivate:[AuthGuard],component:MoviedetailsComponent},
  {path:"tv",canActivate:[AuthGuard],component:TvComponent},
  {path:"tvdetails/:id",canActivate:[AuthGuard],component:TvdetailsComponent},
  {path:"stars",canActivate:[AuthGuard],component:StarsComponent},
  {path:"stardetails/:id",canActivate:[AuthGuard],component:StardetailsComponent},
  {path:"login",component:LoginComponent},
  {path:"register",component:RegistrationComponent},
  {path:"**",component:NotFound404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
