import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import emailjs from '@emailjs/browser'

@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.css']
})

export class NewRecipeComponent {
  constructor(private router: Router, private http: HttpClient, private userService : UserService){ }

  errorMessageFromDatabase : string
  addNewRecipeForm = new FormGroup({
    name : new FormControl('', Validators.required),
    shortDescription : new FormControl('', [Validators.required, Validators.minLength(50)]),
    longDescription : new FormControl('', [Validators.required, Validators.minLength(100)]),
    imageLink : new FormControl('https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png', Validators.required),
    recipeType : new FormControl('', Validators.required)
    });


  uploadRecipe(){
    const url = 'https://localhost:7090/api/recipes/new?userId=' + this.userService.user.id;
    const userData = {
      name: this.addNewRecipeForm.value.name,
      shortDescription: this.addNewRecipeForm.value.shortDescription,
      longDescription: this.addNewRecipeForm.value.longDescription,
      imageLink: this.addNewRecipeForm.value.imageLink,
      recipeType: this.addNewRecipeForm.value.recipeType
    };

    this.http.post<any>(url, userData).subscribe(
      (response) => {
        console.log('Recipe upload success:', response);
        this.http.get<Array<any>>("https://localhost:7090/api/users/" + this.userService.user.id + "/isfavorite").subscribe( async users =>{
          if(users.length != 0){
            for (let i = 0; i < users.length; i++) {
              const email = users[i].email;
              emailjs.init("pPEsqeU4Dy1ymXiek")
              await emailjs.send("service_xvxr4cs","template_8hh42dq",{
                from_name: this.userService.user.firstName,
                to_name: users[i].firstName,
                to_email : email,
                from_email: this.userService.user.email,
                subject: "New Recipe Uploaded!"
                });
            }
          }
        })
        this.router.navigate(['recipes']);
      },
      (error) => {
        this.errorMessageFromDatabase = error.error
        console.error('Recipe upload error:', error);
      }
    );
  }

  onCancel(){
    this.router.navigate(['recipes']);
  }
}
