import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { confirmPasswordValidator } from './confirm-password.validator';
import { UserService } from '../services/user.service';
import { ValidationService } from '../services/validation.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  constructor(private router: Router, private http: HttpClient, private userService : UserService, private validationService : ValidationService){ }

  errorMessageFromDatabase : string
  registratrionForm = new FormGroup({
    email : new FormControl('', [Validators.required, Validators.minLength(10)]),
    userName : new FormControl('', [Validators.required, Validators.minLength(5), this.validationService.noSpaceAllowed as ValidatorFn]),
    password : new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/)]),
    passwordAgain : new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/)]),
    firstName : new FormControl('', [Validators.required, this.validationService.noSpaceAllowed as ValidatorFn]),
    lastName : new FormControl('', [Validators.required, this.validationService.noSpaceAllowed as ValidatorFn])
    });

  ngOnInit(): void {
    this.registratrionForm.setValidators(confirmPasswordValidator)
  }

  register() {
    const url = 'http://localhost:5277/api/users/registration';
    const userData = {
      Email: this.registratrionForm.value.email,
      UserName: this.registratrionForm.value.userName,
      Password: this.registratrionForm.value.password,
      FirstName: this.registratrionForm.value.firstName,
      LastName: this.registratrionForm.value.lastName,
    };

    this.http.post<any>(url, userData).subscribe(
      (response) => {
        console.log('Registration success:', response);
        const user : User = new User(response.id,response.email,response.userName, response.firstName,response.lastName);
        this.userService.setUser(user);
        this.userService.loggedIn = true;
        this.router.navigate(['recipes']);
      },
      (error) => {
        this.errorMessageFromDatabase = error.error.message
        console.error('Registration error:', error);
      }
    );
  }
}
