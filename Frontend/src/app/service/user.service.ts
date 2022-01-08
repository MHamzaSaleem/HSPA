import { Injectable } from '@angular/core';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  addUser(user:User) {
    let users: any = [];
    if(localStorage.getItem('Users')){
      users = JSON.parse(localStorage.getItem('Users') || '');
      users = [...users, user];//... spread operator allow array element to expand
    }
    else{
      users = [user];
    }
    localStorage.setItem('Users',JSON.stringify(users));
  }
}
