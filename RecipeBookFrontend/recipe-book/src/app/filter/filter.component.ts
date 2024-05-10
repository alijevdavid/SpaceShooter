import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {
  category : string = "Összes";
  
  @Output()
  categoryChanged : EventEmitter<string> = new EventEmitter<string>();

  onCategoryChanged(){
    this.categoryChanged.emit(this.category);
  }
}
