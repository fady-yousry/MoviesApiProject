import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; /*to get movie Id by snapshot.params*/
import { SharedApiService } from '../shared-api.service';
import { OwlOptions } from 'ngx-owl-carousel-o'; /* ngx-owl-carousel options */
@Component({
  selector: 'app-moviedetails',
  templateUrl: './moviedetails.component.html',
  styleUrls: ['./moviedetails.component.scss']
})
export class MoviedetailsComponent implements OnInit {

  tubePrefix: string = 'https://www.youtube.com/embed/'; /*the fixed part of trailer Url*/
  imgPrefix: string = "https://image.tmdb.org/t/p/w500"; /*the fixed part of image Url*/
  movieId: number; /* activated movie id by ActivatedRoute snapshot */
  movieDetails: any;
  genres: any; /*movie category*/
  videos: any; /* response of getVideos method "all vidoes"*/
  keys: any[] = []; /*dynamic part of official trailer Url after filter the videos*/
  cast: any[] = []; /*the cast of the movie by movie id*/

  /*dependancy injection inside constructor */
  constructor(private _ActivatedRoute: ActivatedRoute, private _SharedApiService: SharedApiService) {
    this.movieId = this._ActivatedRoute.snapshot.params.id;/*movie id by ActivatedRoute snapshot*/
    //get Movie details 
    this._SharedApiService.getDetails('movie', this.movieId).subscribe(
      (response) => {
        this.movieDetails = response;
        this.genres = this.movieDetails.genres; /*get movie category "crime action ..."*/
      }
    )

    //get all videos related to the movie 
    this._SharedApiService.getVideos('movie', this.movieId).subscribe(
      (response) => {
        this.videos = response.results; /*all videos*/

        //this.keys contains the dynamic url of official trailer 
        //filter videos array and return the 1st one which type ==trailer
        this.keys = this.videos.filter((vid: any) => vid.type == 'Trailer').slice(0, 1); /**/
      }
    )

    //get the cast of the movie by movie id 
    this._SharedApiService.getCast('movie', this.movieId).subscribe(
      (response) => {
        this.cast = response.cast;
      }
    )

  }

  ngOnInit(): void {
  }
  /* ngx-owl-carousel options */
  customOptions: OwlOptions = {
    loop: true,
    slideBy: 3,
    mouseDrag: false,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    lazyLoad: true,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
    autoplaySpeed: 1500,
    animateIn: true,
    animateOut: true,
    slideTransition: 'ease-out',
    margin: 30,

    navText: ["<i class='fa fa-chevron-left'></i>", "<i class='fa fa-chevron-right'></i>"],
    responsive: {
      0: {
        items: 1
      },
      200: {
        items: 3
      },
      400: {
        items: 5
      },
      740: {
        items: 5
      },
      940: {
        items: 5
      }
    },
    nav: true
  }
}

