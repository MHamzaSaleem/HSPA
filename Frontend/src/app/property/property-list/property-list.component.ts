
import { Component, OnInit } from "@angular/core";
import { HousingService } from "src/app/service/housing.service";

@Component({
  selector: 'app-property-list',
  templateUrl:'property-list.component.html',
  styleUrls: ['property-list.component.css']
}

)
export class PropertyListComponent implements OnInit{
  properties : any;
  sellRent:number = 1;
  constructor(private housingService:HousingService){

  }

  ngOnInit(): void {
      this.housingService.getAllProperties(this.sellRent).subscribe(
        data=>{
          this.properties = data;
        }, error => {
          console.log(error);
        }
      );
      // this.http.get('data/properties.json').subscribe(
      // this.http.get('data/properties.json').subscribe(
      //   data=>{
      //     this.properties = data;
      //     console.log(data);
      //   }
      // );
  }
}
