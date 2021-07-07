import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedApiService {
  constructor(private _HttpClient:HttpClient) { }
  //GET Trending Movies&TV for home page
  getTrending(mediaType:string):Observable<any>
  {
    return this._HttpClient.get(`https://api.themoviedb.org/3/trending/${mediaType}/week?api_key=ea1008dc908c7a5fd7a100664b3824cd`);
  }
  //GET movie&tv details by id
  getDetails(mediaType:string,id:any):Observable<any>
  {
    return this._HttpClient.get(`https://api.themoviedb.org/3/${mediaType}/${id}?api_key=ea1008dc908c7a5fd7a100664b3824cd&language=en-US
    `);
  }
  //GET VIDEOS (trailer iframe)
  getVideos(mediaType:string,id:any):Observable<any>
  {
    return this._HttpClient.get(`https://api.themoviedb.org/3/${mediaType}/${id}/videos?api_key=ea1008dc908c7a5fd7a100664b3824cd&language=en-US
    `);
  }
  // get cast of the movie & tv
  getCast(mediaType:string,id:any):Observable<any>
  {
    return this._HttpClient.get(`https://api.themoviedb.org/3/${mediaType}/${id}/credits?api_key=ea1008dc908c7a5fd7a100664b3824cd&language=en-US
    `);
  }
  //get popular movies/tv (movies & tv component) 
  getPopular(mediaType:string,pageNumber:number):Observable<any>
  {
    return this._HttpClient.get(`https://api.themoviedb.org/3/${mediaType}/popular?api_key=ea1008dc908c7a5fd7a100664b3824cd&language=en-US&page=${pageNumber}
    `);
  }
  //get popular stars 
  getStars(pageNumber:any):Observable<any>
  {
    return this._HttpClient.get(`https://api.themoviedb.org/3/person/popular?api_key=ea1008dc908c7a5fd7a100664b3824cd&language=en-US&page=${pageNumber}
    `);
  }
  //get star details by star id 
  getStarDetails(id:any):Observable<any>
  {
    return this._HttpClient.get(`https://api.themoviedb.org/3/person/${id}?api_key=ea1008dc908c7a5fd7a100664b3824cd&language=en-US
    `);
  }
  //get star movies by star id 
  getStarMovies(id:any):Observable<any>
  {
    return this._HttpClient.get(`https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=ea1008dc908c7a5fd7a100664b3824cd&language=en-US
    `);
  }
  
}


