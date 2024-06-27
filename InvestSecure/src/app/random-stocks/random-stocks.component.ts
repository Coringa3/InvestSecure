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
  selectedCompanyIndex: number = -1;
  searchSymbol: string = '';

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

  selectCompany(index: number): void {
    this.selectedCompanyIndex = index;
    const selectedSymbol = this.companyProfiles[index].symbol;
    this.showStockChart(selectedSymbol);
  }

  showStockChart(symbol: string): void {
    console.log(`Mostrando gráfico para ação ${symbol}`);
    // Aqui você pode usar uma biblioteca de gráficos como Chart.js ou Plotly para renderizar o gráfico
  }

  searchCompany(): void {
    if (this.searchSymbol) {
      const symbol = this.searchSymbol.toUpperCase();

      this.finnhubService.getStockQuote(symbol).subscribe(
        quoteData => {
          const existingQuoteIndex = this.stockQuotes.findIndex(quote => quote.symbol === symbol);
          if (existingQuoteIndex !== -1) {
            this.stockQuotes[existingQuoteIndex] = { symbol, data: quoteData };
          } else {
            this.stockQuotes.unshift({ symbol, data: quoteData });
          }

          this.finnhubService.getCompanyProfile(symbol).subscribe(
            profileData => {
              const existingProfileIndex = this.companyProfiles.findIndex(profile => profile.symbol === symbol);
              if (existingProfileIndex !== -1) {
                this.companyProfiles[existingProfileIndex] = { symbol, data: profileData };
              } else {
                this.companyProfiles.unshift({ symbol, data: profileData });
              }

              // Limite o número de perfis a 6 (ou a quantidade desejada)
              if (this.companyProfiles.length > 6) {
                this.companyProfiles.pop();
              }

              // Limpe o campo de busca
              this.searchSymbol = '';
            },
            error => {
              console.error('Erro ao obter o perfil da empresa', error);
              alert('Erro ao obter o perfil da empresa');
            }
          );
        },
        error => {
          console.error('Erro ao obter a cotação das ações', error);
          alert('Erro ao obter a cotação das ações');
        }
      );
    } else {
      alert('Por favor, digite um símbolo de empresa.');
    }
  }
}
