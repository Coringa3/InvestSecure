import { Component } from '@angular/core';
import { FinnhubService } from '../finnhub.service';

@Component({
  selector: 'app-buy',
  templateUrl: './comprar.component.html',
  styleUrls: ['./comprar.component.css']
})
export class BuyComponent {
  stockSymbol: string;
  quantity: number;
  stockQuote: any;

  constructor(private finnhubService: FinnhubService) {}

  buyStock() {
    // Implementar a lógica de compra de ações aqui
    console.log(`Comprando ${this.quantity} ações de ${this.stockSymbol}`);
  }

  getQuote() {
    this.finnhubService.getStockQuote(this.stockSymbol).subscribe(
      data => {
        this.stockQuote = data;
        console.log('Cotação da ação:', this.stockQuote);
      },
      error => {
        console.error('Erro ao buscar cotação:', error);
      }
    );
  }
}
