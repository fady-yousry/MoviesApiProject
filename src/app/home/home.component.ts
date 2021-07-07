import { SharedApiService } from './../shared-api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  imgPrefix:string="https://image.tmdb.org/t/p/w500"; /*the fixed part of image Url*/
  term:string=""; /*search input value send to search pipe by two way data binding */
  trendingMovies:any[]=[]; /*trendingMovies array "api response"*/
  trendingTv:any[]=[]; /*trendingTv array "api response" */
  
   //inject SharedApiService by dependancy injection into constructor
  constructor(private _SharedApiService:SharedApiService) {

    //get trending Movies
    this._SharedApiService.getTrending('movie').subscribe(
      (data)=>{
        this.trendingMovies=data.results.slice(0,12);
        //slice the first 12 trending movie
      },
      (error)=>{console.log("Error : "+error);}, //on error
      ()=>{console.log("trendingMovies loaded successfully");} //complete
    )

     //get trending tv
    this._SharedApiService.getTrending('tv').subscribe(
      (data)=>{
        this.trendingTv=data.results.slice(0,12);
        //slice the 1st 12 trending tv
      },
      (error)=>{console.log("Error : "+error);}, //on error
      ()=>{console.log("trendingTv loaded successfully");} //complete
    )
    
  }

  ngOnInit(): void {
  }

}
