import { ThrowStmt } from "@angular/compiler";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Property } from "src/app/model/Property";
import { HousingService } from "src/app/service/housing.service";


@Component({
  selector: 'property-detail-card',
  templateUrl: 'property-detail.component.html',
  styleUrls: ['property-detail.component.css']
}

)
export class PropertyDetailComponent implements OnInit{
  public propertyId: number;
  property = new Property();
  constructor(private route: ActivatedRoute, private router: Router, private housingService: HousingService){}

  ngOnInit(): void {
      //+ using for converting string to int
      this.propertyId = +this.route.snapshot.params['id'];

      this.route.data.subscribe(
        (data: any) => {
          this.property = data['prp'];
        }
      )

      //this is used to get parameter from updated url
      //this.route.params.subscribe(
      //   (params) => {
      //     this.propertyId = +params['id'];
      //     //this method returns observable thats why we used subcribe method
      //     //subscribe method provides parameter to get error
      //     this.housingService.getProperty(this.propertyId).subscribe(
      //         //we define any instead of Property class because it gives an error
      //         //(data: Property) => {
      //         (data: any) => {
      //           this.property = data
      //       },
      //       error => this.router.navigate(['/'])
      //     )
      //   }
      // );
  }

  // onSelectNext(){
  //     this.propertyId += 1;
  //     this.router.navigate(['property-detail',this.propertyId]);
  // }
}
