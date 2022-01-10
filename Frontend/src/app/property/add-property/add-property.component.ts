import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { TabsetComponent } from "ngx-bootstrap/tabs";
import { IProperty } from "../property-list/IProperty";


@Component({
  selector: 'add-property-card',
  templateUrl: 'add-property.component.html',
  styleUrls: ['add-property.component.css']
}

)
export class AddPropertyComponent implements OnInit {
@ViewChild('formTabs') formTabs?: TabsetComponent;

//These will come from database
propertyType = ['House','Apartment','Duplex']
furnishType = ['Fully','Semi','Unfurnished']
readyToMove = ['East', 'West', 'South', 'North']
gatedCommunity = ['Yes','No']

propertyView:IProperty = {
  Id:null,
  Name: '',
  Price: null,
  SellRent: null,
  Type: ''
};

constructor (private router: Router){}
ngOnInit(): void {

}
onBack(){
  this.router.navigate(['/']);
}
onSubmit(Form: NgForm){
 console.log(Form);
}
selectTab(tabId: number) {
  if (this.formTabs?.tabs[tabId]) {
    this.formTabs.tabs[tabId].active = true;
  }
}
}
