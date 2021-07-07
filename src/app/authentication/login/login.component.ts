import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private _AuthService: AuthService, private _Router: Router) { }

  error: string = '';
  show:boolean=false; //related to eye icon to toggle password 


  loginForm: FormGroup = new FormGroup(
    {
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.pattern('^[A-Za-z].{7,10}$')])
    }
  );
  submit(loginForm: FormGroup) {

    this._AuthService.postLogin(loginForm.value).subscribe(
      (resposne) => {
        if (resposne.message == 'success') {
          localStorage.setItem("currentUser",resposne.token);/*save token in local storage*/ 
          this._AuthService.saveCurrentUserData();/*method to decode the token*/
          this._Router.navigate(["/home"]); /*navigate to homepage*/
        }
        else {
          this.error = resposne.message;
          console.log(this.error);
        }
      }
    )
  }

    // show/hide password method
   PassToggle() {
    let inp =  (<HTMLInputElement>document.getElementById("password"))

    if (inp.type === "password") {
      inp.type = "text";
      this.show=true;
    } else {
      inp.type = "password";
      this.show=false;
    }
  }

  ngOnInit(): void {
  }

}

