import { Component, Input } from "@angular/core";
import { IPropertyBase } from "src/app/model/IPropertyBase";

@Component({
  selector: 'app-property-card',
  //it is not a good thing to code here it is better approach to make template and css in separate files
  //template: '<h1>First Component</h1>'
  //styles: ['h1 {font-weight: normal;}']
  templateUrl:'property-card.component.html',
  styleUrls: ['property-card.component.css']
}

)
export class PropertyCardComponent{
  //to get rid of this error 'Property 'property' has no initializer and is not definitely assigned in the constructor.ts(2564)'
  //add this "strictPropertyInitialization": false to tsconfig.json file
  //input var define to get data from parent components
  @Input() property : IPropertyBase;
  @Input() hideIcons : boolean;
  //using hardcoded for example later we will get it from API
  //Easiet type is String interpolation
  /*Property : any = {
    "Id":1,
    "Name":"Banglow 1",
    "Type":"House",
    "Price":1000000
  }*/
}
