import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ForSaleItem } from '../../../for-sale-item.model';


@Component({
  selector: 'app-for-sale-card',
  templateUrl: './for-sale-card.component.html',
  styleUrl: './for-sale-card.component.css'
})
export class ForSaleCardComponent {
  @Input() item: ForSaleItem;

  @Output() deleteItem = new EventEmitter<string>();

  onDeleteItem(itemId: string) {
    this.deleteItem.emit(itemId);
  }


}
