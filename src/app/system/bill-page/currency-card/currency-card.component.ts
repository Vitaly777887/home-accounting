import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'currency-card',
  templateUrl: './currency-card.component.html',
  styleUrls: ['./currency-card.component.scss']
})
export class CurrencyCardComponent implements OnInit {
  @Input() currency: any;
  currencies: { key: string, curr: number }[];

  ngOnInit(): void {
    const {rates} = this.currency;
    this.currencies = [
      {key: 'RUB', curr: 100},
      {key: 'USD', curr: 100 / rates['RUB'] * rates['USD']},
      {key: 'EUR', curr: 100 / rates['RUB']}];
  }
}
