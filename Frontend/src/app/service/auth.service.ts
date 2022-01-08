import { Injectable } from '@angular/core';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  authUser(user: any){
    let userArray = [];
    if(localStorage.getItem('Users')){
      userArray = JSON.parse(localStorage.getItem('Users') || '');
    }
    return userArray.find((p:any) => p.userName === user.username && p.password === user.password)
  }
}
