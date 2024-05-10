import { Component } from '@angular/core';
import { ReceipesService } from '../services/recipe.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-allrecipes',
  templateUrl: './allrecipes.component.html',
  styleUrls: ['./allrecipes.component.css']
})
export class AllrecipesComponent {
  constructor(public receipesService:ReceipesService, public userService : UserService) { }
 ngOnInit(): void {
   this.receipesService.receipeSelected.subscribe(value =>this.selected = value);
 }

 selected: any
}
