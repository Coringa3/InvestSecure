import { Component, OnInit } from '@angular/core';
import { WalletService } from '../wallet.service';

@Component({
  selector: 'app-owned-stocks',
  templateUrl: './owned-stocks.component.html',
  styleUrls: ['./owned-stocks.component.css']
})
export class OwnedStocksComponent implements OnInit {
  ownedStocks: { symbol: string, quantity: number }[] = [];

  constructor(private walletService: WalletService) { }

  ngOnInit(): void {
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
