import { Component, OnInit } from '@angular/core';
import { SharedApiService } from '../shared-api.service';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.scss']
})
export class StarsComponent implements OnInit {
  imgPrefix: string = 'https://image.tmdb.org/t/p/w500/'; /*the fixed part of image Url*/
  stars: any[] = []; /*the array of stars "api response"*/
  term: string = ""; /*search input value send to search pipe by two way data binding */
  currentPage: number = 1; // for ngx- pagination

  //inject SharedApiService by dependancy injection into constructor
  constructor(private _SharedApiService: SharedApiService) {

    for (let pageNumber = 1; pageNumber <= 250; pageNumber++) {
      this._SharedApiService.getStars(pageNumber).subscribe(
        (response) => {
          // spread operator to merge all pages response arrays coming from api in one array 
          this.stars = [...this.stars, ...response.results];
        }
      )
    }
  }

  //  method to scroll to the top of the page every change when change page
  onPageChange(page: number) {
    this.currentPage = page;
    window.scrollTo(0, 0);
  }
  ngOnInit(): void {
  }

}
