import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, RequiredValidator, Validators, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'user-register',
  templateUrl: 'user-register.component.html',
  styleUrls: ['user-register.component.css']
}

)
export class UserRegisterComponent implements OnInit {
  user: any = {};
  registrationForm: FormGroup;
  constructor ( private fb: FormBuilder, private router: Router){}
  ngOnInit() {
    //Normal way to work with forms
    //this.registrationForm = new FormGroup({
    //  userName: new FormControl('', Validators.required),
    //  email: new FormControl(null,[Validators.required,Validators.email]),
    //  password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
    //  confirmPassword: new FormControl(null, [Validators.required, Validators.minLength(8)]),
    //  mobile: new FormControl(null, [Validators.required, Validators.maxLength(10)])
    //},this.passwordMatchingValidator
    this.createRegistrationForm();
  }
  //Form creation using Form Builder
  createRegistrationForm(){
    this.registrationForm = this.fb.group({
      userName: [null, Validators.required],
      email: [null,[Validators.required,Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      confirmPassword: [null, [Validators.required, Validators.minLength(8)]],
      mobile: [null, [Validators.required, Validators.maxLength(10)]]
    },{Validators:this.passwordMatchingValidator})
  }

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
    return this.registrationForm?.get('password') as FormControl;
  }

  get confirmpassword(){
    return this.registrationForm?.get('confirmPassword') as FormControl;
  }

  onSubmit(){
    console.log(this.registrationForm)
    this.user = Object.assign(this.user, this.registrationForm.value);
    this.addUser(this.user);
    this.registrationForm.reset();
  }

  addUser(user:any){
    let users: any = [];
    if(localStorage.getItem('Users')){
      users = localStorage.getItem('Users');
      users = [user, ...users];
    }
    else{
      users = [user];
    }
    localStorage.setItem('Users',JSON.stringify(users));
  }
}
