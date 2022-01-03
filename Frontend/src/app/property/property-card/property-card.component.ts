import { Component, Input } from "@angular/core";

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
  @Input() property : any
  //using hardcoded for example later we will get it from API
  //Easiet type is String interpolation
  /*Property : any = {
    "Id":1,
    "Name":"Banglow 1",
    "Type":"House",
    "Price":1000000
  }*/
}
