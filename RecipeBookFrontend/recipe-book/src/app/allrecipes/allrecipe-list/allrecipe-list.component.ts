import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-allrecipe-list',
  templateUrl: './allrecipe-list.component.html',
  styleUrls: ['./allrecipe-list.component.css']
})
export class AllrecipeListComponent {
  public recipes : Recipe[];
  ingredients : any
  recipesfromDatabase : any[] =  Array<any>();

  searchText = ""
  selectedCategory : string = "Összes";
  selectedOrder : string = "0";


  constructor(private http : HttpClient, private userService : UserService){
    this.http.get<any[]>("https://localhost:7090/api/recipes/all")
    .subscribe(recipes => {
      this.recipes = this.mapDataToReceipts(recipes)
      this.recipes.sort((a,b) => a.name > b.name ? 1 : -1)
    });
  }
  
  private mapDataToReceipts(data: any): Recipe[] {
    return data.map((item: any) => {
      return {
        id : item.id,
        name : item.name,
        longDescription: item.longDescription,
        shortDescription: item.shortDescription,
        imageLink: item.imageLink,
        ingredients: item.ingredients,
        nameEn : item.nameEn,
        longDescriptionEn: item.longDescriptionEn,
        shortDescriptionEn: item.shortDescriptionEn,
        recipeType : item.recipeType
      };
    });
  }

  onSearchTextEntered(searchValue : string){
    this.searchText = searchValue;
  }

  onCategoryEntered(categoryValue : string){
    if(this.selectedCategory != categoryValue){
      this.selectedCategory = categoryValue;
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
