import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { Property } from 'src/app/model/Property';
import { HousingService } from 'src/app/service/housing.service';

@Injectable({
  providedIn: 'root'
})

//for making it service resolver we have to extend Resolve interface here
export class PropertyDetailResolverService implements Resolve<Property>{

  constructor(private router: Router, private housingService: HousingService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Property | Observable<Property> | Promise<Property> {
      const propId = route.params['id'];
      //+ using before propId in parameter means + used to convert string to int
      return <any>this.housingService.getProperty(+propId).pipe(
        catchError(error => {
          this.router.navigate(['/']);
          return of(null);
        })
      );
      //return <Observable<Property>>this.housingService.getProperty(+propId);
    }
}
