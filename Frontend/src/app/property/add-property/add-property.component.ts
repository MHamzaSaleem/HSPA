// import { Component, OnInit, ViewChild } from "@angular/core";
// import { FormBuilder, FormGroup, NgForm, Validators } from "@angular/forms";
// import { Router } from "@angular/router";
// import { TabsetComponent } from "ngx-bootstrap/tabs";
// import { IPropertyBase } from "src/app/model/IPropertyBase";


// @Component({
//   selector: 'add-property-card',
//   templateUrl: 'add-property.component.html',
//   styleUrls: ['add-property.component.css']
// }

// )
// export class AddPropertyComponent implements OnInit {
// //@ViewChild('Form') addPropertyForm : NgForm;
// //to used reactive form validation in ts file
// addPropertyForm: FormGroup;
// @ViewChild('formTabs') formTabs?: TabsetComponent;

// //These will come from database
// propertyType = ['House','Apartment','Duplex']
// furnishType = ['Fully','Semi','Unfurnished']
// readyToMove = ['East', 'West', 'South', 'North']
// gatedCommunity = ['Yes','No']

// propertyView:IPropertyBase = {
//   Id:null,
//   Name: '',
//   Price: null,
//   SellRent: null,
//   PType: '',
//   FType: '',
//   BHK: null,
//   City: '',
//   BuiltArea: null,
//   RTM: null
// };

// //to create reactive form in ts we have to pass formbuilder in
// // constructor and then have to create and validatior function to validate form controls
// constructor (private router: Router, private fb: FormBuilder){}
// ngOnInit(): void {
//   this.CreateAddPropertyForm();
// }

// CreateAddPropertyForm(){
//   this.addPropertyForm = this.fb.group({
//     SellRent: [null, Validators.required],
//     PType: [null, Validators.required],
//     Name: [null, Validators.required],
//     Price: [null, Validators.required],
//     BuiltArea: [null, Validators.required]
//   })
// }

// onBack(){
//   this.router.navigate(['/']);
// }

// onSubmit(){
//  // onSubmit(Form: NgForm){
//  console.log(this.addPropertyForm.value.SellRent);
// }

// selectTab(tabId: number) {
//   if (this.formTabs?.tabs[tabId]) {
//     this.formTabs.tabs[tabId].active = true;
//   }
// }
// }

import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { TabsetComponent } from 'ngx-bootstrap/tabs/public_api';
import { IPropertyBase } from 'src/app/model/IPropertyBase';


@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {
  @ViewChild('Form') addPropertyForm: NgForm;
  @ViewChild('formTabs') formTabs: TabsetComponent;

  // Will come from masters
  propertyTypes: Array<string> = ['House', 'Apartment', 'Duplex']
  furnishTypes: Array<string> = ['Fully', 'Semi', 'Unfurnished']

  propertyView: IPropertyBase = {
    Id: null,
    Name: '',
    Price: null,
    SellRent: null,
    PType: '',
    FType: '',
    BHK: null,
    BuiltArea: null,
    City: '',
    RTM: null
  };


  constructor(private router: Router) { }

  ngOnInit() {
  }

  onBack() {
    this.router.navigate(['/']);
  }

  onSubmit() {
    console.log('Congrats, form Submitted');
    console.log('SellRent=' + this.addPropertyForm.value.BasicInfo.SellRent);
    console.log(this.addPropertyForm);
  }

  selectTab(tabId: number) {
    this.formTabs.tabs[tabId].active = true;
  }

}
