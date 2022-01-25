import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operators'
import { IProperty } from '../property/property-list/IProperty';
import { Observable } from 'rxjs';
import { Property } from '../model/Property';

@Injectable({
  providedIn: 'root'
})

export class HousingService {
  constructor(private http:HttpClient) { }
  //can define returning type of method using observable
  //i defined Observable<IProperty[]> because i'm returning IProperty array
  getAllProperties(SellRent: number): Observable<IProperty[]>{
    return this.http.get('data/properties.json').pipe(
      map((data:any) => {
        const propertiesArray: Array<IProperty> = [];
        for (const id in data) {
          if(data.hasOwnProperty(id) && data[id].SellRent === SellRent){
            propertiesArray.push(data[id]) ;
          }
        }
        return propertiesArray;
      })
    );
  }
  addProperty(property: Property){
    //JSON.stringify is used to convert json object to string
    localStorage.setItem('newProperty',JSON.stringify(property));
  }
  // getAllCities(): Observable<string[]> {
  //   return this.http.get<string[]>(this.baseUrl + '/city/cities');
  // }

  // getPropertyTypes(): Observable<Ikeyvaluepair[]> {
  //     return this.http.get<IkeyvaluePair[]>(this.baseUrl + '/propertytype/list');
  // }

  // getFurnishingTypes(): Observable<Ikeyvaluepair[]> {
  //     return this.http.get<Ikeyvaluepair[]>(this.baseUrl + '/furnishingtype/list');
  // }
}
