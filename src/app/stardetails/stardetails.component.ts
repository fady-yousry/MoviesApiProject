import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; /*to get star Id by snapshot.params*/
import { SharedApiService } from '../shared-api.service';
import { OwlOptions } from 'ngx-owl-carousel-o';/* ngx-owl-carousel options */

@Component({
  selector: 'app-stardetails',
  templateUrl: './stardetails.component.html',
  styleUrls: ['./stardetails.component.scss']
})
export class StardetailsComponent implements OnInit {
  imgPrefix: string = 'https://image.tmdb.org/t/p/w500/'; /*the fixed part of image Url*/
  starId: number; /* activated star id by ActivatedRoute snapshot params */
  starDetails: any;
  starMovies: any[] = []; /*the movies of the star that will be shown in the carousel*/

  /*dependancy injection inside constructor */
  constructor(private _SharedApiService: SharedApiService, private _ActivatedRoute: ActivatedRoute) {
    this.starId = this._ActivatedRoute.snapshot.params.id;

    //get tv details 
    this._SharedApiService.getStarDetails(this.starId).subscribe(
      (response) => {
        this.starDetails = response;
      }
    )

    //get star Movies by star id  
    this._SharedApiService.getStarMovies(this.starId).subscribe(
      (response) => {
        this.starMovies = response.cast;
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



