import { Component, OnInit } from '@angular/core';
import { FinnhubService } from '../finnhub.service';
import { WalletService } from '../wallet.service';

@Component({
  selector: 'app-random-stocks',
  templateUrl: './random-stocks.component.html',
  styleUrls: ['./random-stocks.component.css']
})
export class RandomStocksComponent implements OnInit {
  stockQuotes: any[] = [];
  companyProfiles: any[] = [];
  symbols: string[] = ['AAPL', 'GOOGL', 'TSLA', 'AMZN', 'MSFT', 'NVDA'];
  selectedCompanyIndex: number = -1;
  searchSymbol: string = '';
  buyQuantity: number = 1;
  sellQuantity: number = 1;
  balance: number = 10000; // Defina um valor inicial para o saldo
  errorMessage: string = ''; // Inicialize a mensagem de erro como vazia

  constructor(private finnhubService: FinnhubService, private walletService: WalletService) { }

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

              if (this.companyProfiles.length > 6) {
                this.companyProfiles.pop();
              }

              this.searchSymbol = '';
            },
            error => {
              console.error('Erro ao obter o perfil da empresa', error);
              this.errorMessage = 'Erro ao obter o perfil da empresa';
            }
          );
        },
        error => {
          console.error('Erro ao obter a cotação das ações', error);
          this.errorMessage = 'Erro ao obter a cotação das ações';
        }
      );
    } else {
      this.errorMessage = 'Por favor, digite um símbolo de empresa.';
    }
  }

  buyStock() {
    if (this.selectedCompanyIndex !== -1 && this.buyQuantity > 0) {
      const symbol = this.companyProfiles[this.selectedCompanyIndex].symbol;
      this.walletService.buyStock(symbol, this.buyQuantity).subscribe(
        response => {
          // Atualizar a lista de ações possuídas após a compra
          // Isso pode ser feito automaticamente se o serviço de wallet emitir um evento ou notificação
          console.log('Compra realizada com sucesso:', response);
          // Atualizar o saldo após a compra (simulado)
          this.balance -= this.getStockQuote(symbol)?.data.c * this.buyQuantity;
        },
        error => {
          console.error('Erro ao comprar ações:', error);
          this.errorMessage = 'Erro ao comprar ações';
        }
      );
    } else {
      this.errorMessage = 'Por favor, selecione uma empresa e insira uma quantidade válida.';
    }
  }

  sellStock() {
    if (this.selectedCompanyIndex !== -1 && this.sellQuantity > 0) {
      const symbol = this.companyProfiles[this.selectedCompanyIndex].symbol;
      // Implementar lógica para vender ações, se necessário
    } else {
      this.errorMessage = 'Por favor, selecione uma empresa e insira uma quantidade válida.';
    }
  }
}
