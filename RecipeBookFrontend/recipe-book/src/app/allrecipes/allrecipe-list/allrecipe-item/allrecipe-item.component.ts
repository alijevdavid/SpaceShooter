import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Recipe } from 'src/app/models/recipe.model';
import { ReceipesService } from 'src/app/services/recipe.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-allrecipe-item',
  templateUrl: './allrecipe-item.component.html',
  styleUrls: ['./allrecipe-item.component.css']
})
export class AllrecipeItemComponent implements OnInit{
  @Input() recipe : Recipe;
  selectedLanguage : string = "hu";

  constructor(public receipeService:ReceipesService, private translate : TranslateService, private http : HttpClient, private userService : UserService) { }

  ngOnInit() {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.selectedLanguage = event.lang;
    });
  }

  onSelected(){
    this.http.get<any>("https://localhost:7090/api/recipes/recipe/" + this.recipe.id + "/user")
    .subscribe(user => {
      this.http.get<any>("https://localhost:7090/api/users/" + this.userService.user.id + "/favorites").subscribe(
        (response) => {
          if(response.length != 0 && response[0].id == user.id){
            this.receipeService.isThereAnyFavorite = true
          }
          else{
            this.receipeService.isThereAnyFavorite = false
          }
        },
        (error) => {
          this.receipeService.isThereAnyFavorite = false
        }
      );
    });
    this.receipeService.receipeSelected.emit(this.recipe)
  }
}
