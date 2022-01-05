import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, RequiredValidator, Validators } from "@angular/forms";
import { Router } from "@angular/router";


@Component({
  selector: 'user-register',
  templateUrl: 'user-register.component.html',
  styleUrls: ['user-register.component.css']
}

)
export class UserRegisterComponent implements OnInit {
registrationForm: FormGroup;
constructor (private router: Router){}
ngOnInit(): void {
  this.registrationForm = new FormGroup({
    userName: new FormControl('Enter Name', Validators.required),
    email: new FormControl(null,[Validators.required,Validators.email])
  })
}
onSubmit(){
  console.log(this.registrationForm)
}
}
