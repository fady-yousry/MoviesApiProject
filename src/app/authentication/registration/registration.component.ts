import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  constructor(private _AuthService: AuthService, private _Router: Router) { }

  error: string = '';
  show: boolean = false; //related to eye icon to toggle password 

  registerForm: FormGroup = new FormGroup(
    {
      first_name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
      last_name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
      age: new FormControl(null, [Validators.required, Validators.min(18), Validators.max(80)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.pattern('^[A-Za-z].{7,10}$')])
    }
  );
  submit(registerForm: FormGroup) {

    this._AuthService.postRegistration(registerForm.value).subscribe(
      (resposne) => {
        if (resposne.message == 'success') {
          this._Router.navigate(["/login"]);
        }
        else {
          this.error = resposne.errors.email.message;
          console.log(this.error);
        }
      }
    )
  }

  // show/hide password method
  PassToggle() {
    let inp = (<HTMLInputElement>document.getElementById("password"))

    if (inp.type === "password") {
      inp.type = "text";
      this.show = true;
    } else {
      inp.type = "password";
      this.show = false;
    }
  }

  ngOnInit(): void {
  }

}
