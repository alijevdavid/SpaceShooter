import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { Subject } from 'rxjs/internal/Subject';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable()
export class ReceipesService {
  private data = new BehaviorSubject("")
  currentData = this.data.asObservable();
  
  constructor(){}

  receipeSelected = new EventEmitter<Recipe>();
  selected : Recipe
  isThereAnyFavorite : boolean = false

  setData(data:any) {
    this.data.next(data);
  }

}