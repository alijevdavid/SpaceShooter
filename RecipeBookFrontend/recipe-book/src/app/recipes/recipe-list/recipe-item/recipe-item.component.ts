import { Component, Input, OnInit,EventEmitter,Output } from '@angular/core';
import { Recipe } from '../../../models/recipe.model';
import { ReceipesService } from '../../../services/recipe.service';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit{
  @Input() recipe : Recipe;
  selectedLanguage : string = "hu";

  constructor(public receipeService:ReceipesService, private translate : TranslateService) { }

  ngOnInit() {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.selectedLanguage = event.lang;
    });
  }

    onSelected(){
    this.receipeService.receipeSelected.emit(this.recipe)
  }

}
