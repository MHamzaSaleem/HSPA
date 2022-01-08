import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AlertifyService } from "src/app/service/alertify.service";
import { AuthService } from "src/app/service/auth.service";


@Component({
  selector: 'user-login',
  templateUrl: 'user-login.component.html',
  styleUrls: ['user-login.component.css']
}

)
export class UserLoginComponent implements OnInit {
  constructor (private authService: AuthService, private alertify: AlertifyService, private router: Router){}
  ngOnInit(): void {

  }
  onLogin(loginForm: NgForm){
    const token = this.authService.authUser(loginForm.value);
    if(token)
    {
      localStorage.setItem('token',token.userName);
      this.alertify.success("Login successfully");
      this.router.navigate(['/']);
    }
    else
      this.alertify.error("Please provide valid credentials to login");
    console.log(loginForm.value);
  }
}
