
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
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
  constructor(private housingService:HousingService, private route: ActivatedRoute){

  }

  ngOnInit(): void {
      if (this.route.snapshot.url.toString()) {
        this.sellRent = 2; // Means we are on rent-property URL else we are on base URL
      }
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
