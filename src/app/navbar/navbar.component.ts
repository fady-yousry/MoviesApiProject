import { AuthService } from './../authentication/auth.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isLogin:boolean=false;
  constructor(private _AuthService:AuthService) { 
    this._AuthService.currentUserData.subscribe(
      ()=>{
        if(this._AuthService.currentUserData.getValue()==null)
        {
          this.isLogin=false;
        }
        else
        {
          this.isLogin=true;
        }

      }
    )
  }
  logOut()
  {
    this._AuthService.logOut();
  }

  ngOnInit(): void {
  }

}
