import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { FormGroup, FormControl } from '@angular/forms';
import { User } from '../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private router: Router, private http: HttpClient, private userService : UserService){
  }

  loginForm = new FormGroup({
    emailOrUserName : new FormControl(''),
    password : new FormControl('')
    });

  errorMessageFromDatabase : string

  login() {
    const url = 'http://localhost:5277/api/users/login';
    const userData = {
      Email: this.loginForm.value.emailOrUserName,
      Password: this.loginForm.value.password,
      UserName: this.loginForm.value.emailOrUserName,
      FirstName: "",
      LastName: "",
    };

    this.http.post(url, userData).subscribe(
      (response : any) => {
        console.log('Login success:', response);
        const user : User = new User(response.id,response.email,response.userName, response.firstName,response.lastName);
        this.userService.setUser(user);
        this.userService.loggedIn = true;
        this.router.navigate(['recipes']);
      },
      (error) => {
        this.errorMessageFromDatabase = error.error.message
        console.error('Login error:', error);
      }
    );
  }
}
