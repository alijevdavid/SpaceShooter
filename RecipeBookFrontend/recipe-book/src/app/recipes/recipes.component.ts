import { Component, OnInit } from '@angular/core';
import { ReceipesService } from '../services/recipe.service';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  constructor(public receipesService:ReceipesService, public userService : UserService) { }

  ngOnInit(): void {
    this.receipesService.receipeSelected.subscribe(value =>this.selected = value);
  }

  selected: any
}
