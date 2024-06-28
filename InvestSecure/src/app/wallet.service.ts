import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

interface OwnedStock {
  symbol: string;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class WalletService {
  private ownedStocks: OwnedStock[] = [
    { symbol: 'AAPL', quantity: 10 },
    { symbol: 'GOOGL', quantity: 5 },
    { symbol: 'TSLA', quantity: 15 }
  ];

  constructor() { }

  getOwnedStocks(): Observable<OwnedStock[]> {
    return of(this.ownedStocks);
  }

  buyStock(symbol: string, quantity: number): Observable<boolean> {
    // Simular uma chamada assíncrona de compra de ações
    return new Observable<boolean>(observer => {
      // Verifica se já possui ação com este símbolo
      const index = this.ownedStocks.findIndex(stock => stock.symbol === symbol);
      if (index !== -1) {
        // Se já possuir, apenas atualiza a quantidade
        this.ownedStocks[index].quantity += quantity;
      } else {
        // Se não possuir, adiciona uma nova entrada
        this.ownedStocks.push({ symbol, quantity });
      }
      // Notifica que a compra foi realizada com sucesso
      observer.next(true);
      observer.complete();
    });
  }
}
