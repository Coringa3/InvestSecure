import { Component, OnInit } from '@angular/core';
import { FinnhubService } from '../finnhub.service';

@Component({
  selector: 'app-random-stocks',
  templateUrl: './random-stocks.component.html',
  styleUrls: ['./random-stocks.component.css']
})
export class StockDisplayComponent implements OnInit {
  stockQuotes: any[] = [];
  companyProfiles: any[] = [];
  symbols: string[] = ['AAPL', 'GOOGL', 'TSLA', 'AMZN', 'MSFT', 'NVDA'];

  constructor(private finnhubService: FinnhubService) { }

  ngOnInit(): void {
    this.symbols.forEach(symbol => {
      this.getStockData(symbol);
    });
  }

  getStockData(symbol: string): void {
    this.finnhubService.getStockQuote(symbol).subscribe(
      data => {
        this.stockQuotes.push({ symbol, data });
      },
      error => {
        console.error('Erro ao obter a cotação das ações', error);
      }
    );

    this.finnhubService.getCompanyProfile(symbol).subscribe(
      data => {
        this.companyProfiles.push({ symbol, data });
      },
      error => {
        console.error('Erro ao obter o perfil da empresa', error);
      }
    );
  }

  getStockQuote(symbol: string) {
    return this.stockQuotes.find(quote => quote.symbol === symbol);
  }
}
