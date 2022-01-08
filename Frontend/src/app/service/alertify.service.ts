import { Injectable } from '@angular/core';
import * as alertyfy from 'alertifyjs';

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }

  success(message: string){
    return alertyfy.success(message);
  }

  error(message: string){
    return alertyfy.error(message);
  }

  warning(message: string){
    return alertyfy.warning(message);
  }
}
