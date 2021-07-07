import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; /*to get tv Id by snapshot.params*/
import { SharedApiService } from '../shared-api.service';
import { OwlOptions } from 'ngx-owl-carousel-o'; /* ngx-owl-carousel options */

@Component({
  selector: 'app-tvdetails',
  templateUrl: './tvdetails.component.html',
  styleUrls: ['./tvdetails.component.scss']
})

export class TvdetailsComponent implements OnInit {

  tubePrefix: string = 'https://www.youtube.com/embed/'; /*the fixed part of trailer Url*/
  imgPrefix: string = "https://image.tmdb.org/t/p/w500"; /*the fixed part of image Url*/
  tvId: number; /* activated tv id by ActivatedRoute snapshot params */
  tvDetails: any; /*tv details */
  genres: any; /*tv category*/
  videos: any; /* response of getVideos method "all vidoes"*/
  keys: any[] = []; /*dynamic part of official trailer Url after filter the videos*/
  cast: any[] = []; /*get cast  id*/
  seasons: any[] = [];

  /*dependancy injection inside constructor */
  constructor(private _ActivatedRoute: ActivatedRoute, private _SharedApiService: SharedApiService, private _Router: Router) {

    //get tv details 
    this.tvId = this._ActivatedRoute.snapshot.params.id;/*movie id by ActivatedRoute snapshot*/
    this._SharedApiService.getDetails('tv', this.tvId).subscribe(
      (response) => {
        this.tvDetails = response;
        this.genres = this.tvDetails.genres; /*get tv category "crime action ..."*/
        this.seasons = this.tvDetails.seasons;
      }
    )

    //get all videos
    this._SharedApiService.getVideos('tv', this.tvId).subscribe(
      (response) => {
        this.videos = response.results;  /*all videos*/

        //this.keys contains the dynamic url of official trailer 
        //filter videos array and return the 1st one which type ==trailer
        this.keys = this.videos.filter((vid: any) => vid.type == 'Trailer').slice(0, 1);
      }
    )

    //get cast by id 
    this._SharedApiService.getCast('tv', this.tvId).subscribe(
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
        items: 3,
        autoplay: false,
        loop: false,
        mouseDrag: false,
        touchDrag: true,
        pullDrag: true,
        dots: true,
        navSpeed: 700,
        animateIn: true,
        animateOut: true,
        slideTransition: 'ease-out',
        margin: 15,
        nav: false
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


