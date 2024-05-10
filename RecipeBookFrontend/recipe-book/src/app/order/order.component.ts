import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {
  order : string = "0";
  
  @Output()
  orderChanged : EventEmitter<string> = new EventEmitter<string>();

  onOrderChanged(){
    this.orderChanged.emit(this.order);
  }
}
