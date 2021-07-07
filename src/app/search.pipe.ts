//search pipe using "term" by two way data binding in apiResponseArray
//then filter which (movies/tv/star) name includes this term
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(apiResponseArray: any[], term: string): any[] {
    return apiResponseArray.filter((element)=>{
        if(element.title !=undefined)
        {
          return element.title.toLowerCase().includes(term.toLowerCase());
        }
        else
        {
          return element.name.toLowerCase().includes(term.toLowerCase());
        }
      })
  }
} 
