import { Component,EventEmitter,Input,OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Recipe } from '../../models/recipe.model';
import { HttpClient } from '@angular/common/http';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ReceipesService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnChanges,OnInit {
  @Input() selected : Recipe

  selectedLanguage: string = "hu";
  ingredients : any[] = new Array<any>();

  errorMessageFromDatabase : string
  addNewIngredientForm = new FormGroup({
    name : new FormControl('', Validators.required)
    });
  
  constructor(private http : HttpClient, private translate : TranslateService, private router: Router, private recipeService : ReceipesService){

  }
  ngOnInit(): void {
    if (this.selected) {
      this.fetchIngredients(this.selected.id);
    }

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.selectedLanguage = event.lang;
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selected'] && !changes['selected'].firstChange) {
      const newRecipeId = changes['selected'].currentValue?.id;
      if (newRecipeId) {
        this.fetchIngredients(newRecipeId);
      }
    }
  }

  private fetchIngredients(recipeId: number): void {
    this.ingredients = [];
    this.http.get<any>("https://localhost:7090/api/recipes/get/" + recipeId)
      .subscribe(recipe => {
        for (let i = 0; i < recipe.ingredients.length; i++) {
          this.http.get("https://localhost:7090/api/ingredients/get/" + recipe.ingredients[i])
          .subscribe(ingredient => {
            this.ingredients.push(ingredient)
          });
        }
        this.selected.ingredients = this.ingredients
      });
  }

  uploadIngredient(){
    const url = 'https://localhost:7090/api/ingredients/new?recipeId=' + this.selected.id;
    const userData = {
      name: this.addNewIngredientForm.value.name
    };

    this.http.post(url, userData).subscribe(
      (response) => {
        console.log('Ingredient upload success:', response);
        this.fetchIngredients(this.selected.id)
        this.router.navigate(['recipes']);
      },
      (error) => {
        this.fetchIngredients(this.selected.id)
        this.errorMessageFromDatabase = error.error.message
        console.error('Ingredient upload error:', error);
      }
    );
  }

  deleteIngredient(id:number){
    const url = 'https://localhost:7090/api/ingredients/delete/' + id;
    this.http.delete(url).subscribe(
      (response) => {
        console.log('Ingredient delete success:', response);
        this.fetchIngredients(this.selected.id)
        this.router.navigate(['recipes']);
      },
      (error) => {
        this.errorMessageFromDatabase = error.error.message
        console.error('Ingredient delete error:', error);
      }
    );
  }

  editRecipe(){
    this.recipeService.setData(this.selected);
  }
}
