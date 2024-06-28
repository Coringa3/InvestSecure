import { Component, OnInit } from '@angular/core';
import { WalletService } from '../wallet.service';
import { FinnhubService } from '../finnhub.service';  
import { RandomStocksComponent } from '../random-stocks/random-stocks.component';

@Component({
  selector: 'app-owned-stocks',
  templateUrl: './owned-stocks.component.html',
  styleUrls: ['./owned-stocks.component.css']
})
export class OwnedStocksComponent implements OnInit {
  ownedStocks: { symbol: string, quantity: number, preco_un: number }[] = [];

  constructor(private walletService: WalletService, private finnhub: FinnhubService) { }

  ngOnInit(): void {
    this.getStockData(symbol);
    this.walletService.getOwnedStocks().subscribe(
      stocks => {
        this.ownedStocks = stocks;
      },
      error => {
        console.error('Erro ao obter ações compradas:', error);
      }
    );
  }
}
