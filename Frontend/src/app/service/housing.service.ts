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
  getAllProperties(SellRent?: number): Observable<Property[]>{
    return this.http.get('data/properties.json').pipe(
      map((data:any) => {
        const propertiesArray: Array<Property> = [];
        if(localStorage.getItem('newProperty')){
          const localProperties = JSON.parse(localStorage.getItem('newProperty') || '');
          for (const id in localProperties) {
            if(SellRent){
              if(localProperties.hasOwnProperty(id) && localProperties[id].sellRent === SellRent){
                propertiesArray.push(localProperties[id]) ;
              }
            }
            else{
              propertiesArray.push(localProperties[id]) ;
            }
          }
        }
        for (const id in data) {
          if(SellRent){
            if(data.hasOwnProperty(id) && data[id].SellRent === SellRent){
              propertiesArray.push(data[id]) ;
            }
          }
          else{
            propertiesArray.push(data[id]);
          }
        }
        localStorage.setItem('test',JSON.stringify(propertiesArray));
        return propertiesArray;
      })
    );
  }
  addProperty(property: Property){//form ki property map hoke ae
    let newProp = [property]; // converts object to array property type k
    //add new property in array if property already exists in local storage
    if(localStorage.getItem('newProperty')){//
      newProp = [property, ...JSON.parse(localStorage.getItem('newProperty') || '')];
    }
    //JSON.stringify is used to convert json object to string
    localStorage.setItem('newProperty',JSON.stringify(newProp));
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

  newPropID(){
     if(localStorage.getItem('PID')){
       //We cannot store integer type in localstorage have to convert in string before storing
       localStorage.setItem('PID',String(+localStorage.getItem('PID')!+1))
       return +localStorage.getItem('PID')!;
     }
     else{
       localStorage.setItem('PID','101');
       return 101;
     }
  }

  getProperty(id: number){
    //pipe is used to filter data which is returned from method
    return this.getAllProperties().pipe(
      map(propertiesArray => {
        //throw new Error('Some error for testing');
        return propertiesArray.find(x=>x.id === id);
      })
    );
  }
}
