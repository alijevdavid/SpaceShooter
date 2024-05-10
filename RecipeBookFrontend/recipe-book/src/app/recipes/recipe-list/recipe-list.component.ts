import { Component } from '@angular/core';
import { Recipe } from '../../models/recipe.model';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent{
  recipes : Recipe[] = new Array<Recipe>;
  ingredients : any
  recipesfromDatabase : any[] =  Array<any>();

  searchText = ""
  selectedCategory : string = "Összes";
  selectedOrder : string = "0";


  constructor(private http : HttpClient, private userService : UserService){
    this.loadRecipes();
  }

  loadRecipes() {
    this.http.get<any>("https://localhost:7090/api/users/get/" + this.userService.user.id)
    .subscribe(user => {
      for (let i = 0; i < user.recipes.length; i++) {
        this.http.get<any>("https://localhost:7090/api/recipes/get/" + user.recipes[i])
        .subscribe(recipe => {
          this.recipesfromDatabase.push(recipe)
        });
      }
      this.recipes = this.recipesfromDatabase
      this.recipes.sort((a,b) => a.name > b.name ? 1 : -1)
    });
  }

  onSearchTextEntered(searchValue : string){
    this.searchText = searchValue;
  }

  onCategoryEntered(categoryValue : string){
    if(this.selectedCategory != categoryValue){
      this.selectedCategory = categoryValue;
      console.log(this.selectedCategory)
    }
  }
  onOrderEntered(orderValue : string){
    if(this.selectedOrder != orderValue){
      this.selectedOrder = orderValue;
      if(this.selectedOrder == "0"){
        this.recipes.sort((a, b) => (a.name > b.name ? 1 : -1))
      }
      else{
        this.recipes.sort((a, b) => (a.name > b.name ? -1 : 1))
      }
    }
  }
}
