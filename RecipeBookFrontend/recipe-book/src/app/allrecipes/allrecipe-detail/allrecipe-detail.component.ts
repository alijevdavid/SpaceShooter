import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Recipe } from 'src/app/models/recipe.model';
import { ReceipesService } from 'src/app/services/recipe.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-allrecipe-detail',
  templateUrl: './allrecipe-detail.component.html',
  styleUrls: ['./allrecipe-detail.component.css']
})
export class AllrecipeDetailComponent implements OnChanges,OnInit {
  @Input() selected : Recipe

  selectedLanguage: string = "hu";
  ingredients : any[] = Array<any>();
  errorMessage : string = "";
  successMessage : string = "";
  
  constructor(private http : HttpClient, private translate : TranslateService, private userService : UserService, public recipeService : ReceipesService){ }
  ngOnInit(): void {
    if (this.selected) {
      this.fetchIngredients(this.selected.id);
    }

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.selectedLanguage = event.lang;
    });

    /*this.http.get<any>("https://localhost:7090/api/users/" + this.userService.user.id + "/favorites").subscribe( user =>{
      console.log(user)
      if(user.length != 0){
        this.isThereAnyFavorite = true;
      }
    })*/
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
    this.ingredients = []
    this.http.get<any>("https://localhost:7090/api/recipes/get/" + recipeId)
      .subscribe(recipe => {
        for (let i = 0; i < recipe.ingredients.length; i++) {
          this.http.get<any>("https://localhost:7090/api/ingredients/get/" + recipe.ingredients[i])
          .subscribe(ingredient => {
            this.ingredients.push(ingredient)
          });
        }
        this.selected.ingredients = this.ingredients
      });
  }

  uploadFavorite(){
    this.errorMessage = "";
    this.successMessage = "";

    if(this.userService.user == null){
      this.errorMessage = "Please log into your account to select a favorite user"
    }
    if(this.userService.user != null){
      this.http.get<any>("https://localhost:7090/api/recipes/recipe/" + this.selected.id + "/user")
      .subscribe(selectedRecipesUser => {
        this.http.get<any>("https://localhost:7090/api/users/" +  this.userService.user.id + "/favorites")
        .subscribe(usersFavorites => {
          if(usersFavorites[0] != null){
            if (selectedRecipesUser.id != usersFavorites[0].id) {
              this.errorMessage = "You already have a favorite user!"
            }
          }
          if(this.errorMessage == "" || selectedRecipesUser.id == usersFavorites[0].id){
            if (this.recipeService.isThereAnyFavorite) {
              this.http.get<any>("https://localhost:7090/api/recipes/recipe/" + this.selected.id + "/user")
              .subscribe(user => {
                this.http.delete("https://localhost:7090/api/users/" + this.userService.user.id + "/favorite/" + user.id).subscribe(
                  (response) => {
                    this.recipeService.isThereAnyFavorite = !this.recipeService.isThereAnyFavorite
                    this.successMessage = "You succesfully deleted your favorite user!"
                  },
                  (error) => {
                    this.errorMessage = error.error
                    console.error('Upload error:', error);
                  }
                );
              });
            }
            else{
              this.http.get<any>("https://localhost:7090/api/recipes/recipe/" + this.selected.id + "/user")
              .subscribe(user => {
                this.http.post("https://localhost:7090/api/users/" + this.userService.user.id + "/favorite/" + user.id, null).subscribe(
                  (response) => {
                    this.recipeService.isThereAnyFavorite = !this.recipeService.isThereAnyFavorite
                    this.successMessage = "You succesfully updated your favorite user!"
                  },
                  (error) => {
                    this.errorMessage = error.error
                    console.error('Upload error:', error);
                  }
                );
              });
            }
          }
        });
      });
    }
  }
}
