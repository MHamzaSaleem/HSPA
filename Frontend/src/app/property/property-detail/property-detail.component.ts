import { ThrowStmt } from "@angular/compiler";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";


@Component({
  selector: 'property-detail-card',
  templateUrl: 'property-detail.component.html',
  styleUrls: ['property-detail.component.css']
}

)
export class PropertyDetailComponent implements OnInit{
  public propertyId: number;
  constructor(private route: ActivatedRoute, private router: Router){}

  ngOnInit(): void {
      //+ using for converting string to int
      this.propertyId = +this.route.snapshot.params['id'];

      //this is used to get parameter from updated url
      this.route.params.subscribe(
        (params) => {
          this.propertyId = +params['id'];
        }
      );
  }

  onSelectNext(){
      this.propertyId += 1;
      this.router.navigate(['property-detail',this.propertyId]);
  }
}
