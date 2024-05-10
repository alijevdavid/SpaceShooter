import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReceipesService } from '../services/recipe.service';
import { Recipe } from '../models/recipe.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css']
})
export class EditRecipeComponent implements OnInit{
  idParam : any
  recipe : any

  errorMessageFromDatabase : string
  editRecipeForm :FormGroup
    
  constructor(private http : HttpClient, private route: ActivatedRoute, private router: Router, private recipeService : ReceipesService){
    this.route.params.subscribe( param => this.idParam = param );
  }
  ngOnInit(): void {
    this.recipeService.currentData.subscribe(data => {
      this.recipe = data;
    });
    this.editRecipeForm = new FormGroup({
      name : new FormControl(this.recipe.name, Validators.required),
      shortDescription : new FormControl(this.recipe.shortDescription, [Validators.required, Validators.minLength(50)]),
      longDescription : new FormControl(this.recipe.longDescription, [Validators.required, Validators.minLength(100)]),
      imageLink : new FormControl(this.recipe.imageLink, Validators.required),
      recipeType : new FormControl(this.recipe.recipeType, Validators.required)
      });
  }

  cancelEdit(){
    this.router.navigate(['recipes']);
  }

  editRecipe(){
    const url = 'https://localhost:7090/api/recipes/edit/' + this.recipe.id;
    const userData = {
      id : this.recipe.id,
      name: this.editRecipeForm.value.name,
      shortDescription: this.editRecipeForm.value.shortDescription,
      longDescription: this.editRecipeForm.value.longDescription,
      imageLink: this.editRecipeForm.value.imageLink,
      recipeType: this.editRecipeForm.value.recipeType,
    };

    this.http.put<any>(url, userData).subscribe(
      (response) => {
        console.log('Edit success:', response);
        this.router.navigate(['recipes']);
      },
      (error) => {
        this.errorMessageFromDatabase = error.error
        console.error('Registration error:', error);
      }
    );
  }
}
