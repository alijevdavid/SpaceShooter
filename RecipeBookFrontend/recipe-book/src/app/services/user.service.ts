import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  user: User;
  loggedIn: boolean = false;

  isLoggedIn() {
    return this.loggedIn;
  }

  setUser(user : User){
    this.user = user;
  }


}