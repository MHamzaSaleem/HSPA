import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, RequiredValidator, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AbstractControl } from '@angular/forms';

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
      userName: new FormControl('', Validators.required),
      email: new FormControl(null,[Validators.required,Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl(null, [Validators.required]),
      mobile: new FormControl(null, [Validators.required, Validators.maxLength(10)])
    },this.passwordMatchingValidator
  )}

  //custom cross validator for password matching
  passwordMatchingValidator(fg: AbstractControl){
    return fg.get('password')?.value === fg.get('confirmPassword')?.value ? null : {notmatched: true}
  }

  //getter method in angular it must return a value and cannot have parameters
  get username(){
    return this.registrationForm.get('userName') as FormControl;
  }

  get email(){
    return this.registrationForm.get('email') as FormControl;
  }

  get password(){
    return this.registrationForm.get('password') as FormControl;
  }

  onSubmit(){
    console.log(this.registrationForm)
  }
}
