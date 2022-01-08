import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, RequiredValidator, Validators, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { AbstractControl } from '@angular/forms';
import { UserService } from "src/app/service/user.service";
import { ThrowStmt } from "@angular/compiler";
import { User } from "src/app/model/user";
import { AlertifyService } from "src/app/service/alertify.service";

@Component({
  selector: 'user-register',
  templateUrl: 'user-register.component.html',
  styleUrls: ['user-register.component.css']
}

)
export class UserRegisterComponent implements OnInit {
  user: User;
  submitted: boolean;
  registrationForm: FormGroup;
  constructor ( private fb: FormBuilder, private router: Router, private userService: UserService, private alertify: AlertifyService){}
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

  //--------------------------------------------------------------------------
  //Getter methods for all form controls
  //getter method in angular it must return a value and cannot have parameters
  //--------------------------------------------------------------------------
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

  get mobile(){
    return this.registrationForm?.get('mobile') as FormControl;
  }

  onSubmit(){
    this.submitted = true;
    console.log(this.registrationForm)
    if(this.registrationForm.valid){
      //this.user = Object.assign(this.user, this.registrationForm.value);
      this.userService.addUser(this.userData());
      this.registrationForm.reset();
      this.submitted = false;
      this.alertify.success('Congrats, you are successfully registered');
    }
    else{
      this.alertify.error('Kindly provied the required fields');
    }
  }

  userData(): User{
    return this.user = {
      UserName: this.username.value,
      Email: this.email.value,
      Password: this.password.value,
      mobile: this.mobile.value
    }
  }
}
