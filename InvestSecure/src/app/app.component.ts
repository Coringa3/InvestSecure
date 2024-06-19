import { Component, OnInit } from '@angular/core';
import { FinnhubService } from './finnhub.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'finnhub-app';
  stockQuote: any;
  companyProfile: any;

  constructor(private finnhubService: FinnhubService) {}

  ngOnInit() {
    this.getStockQuote('AAPL'); // Exemplo com o símbolo da Apple
    this.getCompanyProfile('AAPL');
  }

  getStockQuote(symbol: string) {
    this.finnhubService.getStockQuote(symbol).subscribe(
      data => {
        this.stockQuote = data;
        console.log(this.stockQuote);
      },
      error => {
        console.error('Error fetching stock quote', error);
      }
    );
  }

  getCompanyProfile(symbol: string) {
    this.finnhubService.getCompanyProfile(symbol).subscribe(
      data => {
        this.companyProfile = data;
        console.log(this.companyProfile);
      },
      error => {
        console.error('Error fetching company profile', error);
      }
    );
  }
}
