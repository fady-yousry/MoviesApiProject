import { Component, OnInit } from '@angular/core';
import { SharedApiService } from './../shared-api.service';


@Component({
  selector: 'app-tv',
  templateUrl: './tv.component.html',
  styleUrls: ['./tv.component.scss']
})
export class TvComponent implements OnInit {

  imgPrefix: string = 'https://image.tmdb.org/t/p/w500/'; /*the fixed part of image Url*/
  popularTvShows: any[] = []; /*the array of tv "api response"*/
  term: string = ""; /*search input value send to search pipe by two way data binding */
  currentPage: number = 1; // for ngx- pagination

  //inject SharedApiService by dependancy injection into constructor
  constructor(private _SharedApiService: SharedApiService) {

    // api is paginated ,, for loop on page number to get all Pages
    for (let pageNumber = 1; pageNumber <= 250; pageNumber++) {
      this._SharedApiService.getPopular('tv', pageNumber).subscribe(
        (response) => {
          // spread operator to merge all pages response arrays coming from api in one array 
          this.popularTvShows = [...this.popularTvShows, ...response.results];
        }
      )
    }
  }
  // method to scroll to the top of the page every change when change page 
  onPageChange(page: number) {
    this.currentPage = page;
    window.scrollTo(0, 0);
  }
  ngOnInit(): void {
  }

}
