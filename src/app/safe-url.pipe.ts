// pipe to solve iframe youtube url error unsafe 
//ERROR Error: unsafe value used in a resource URL context (see https://g.co/ng/security#xss)
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safeUrl'
})
export class SafeUrlPipe implements PipeTransform {

  constructor(private _DomSanitizer: DomSanitizer) { }

  transform(url:string) {
    return this._DomSanitizer.bypassSecurityTrustResourceUrl(url);
    
  }

}
