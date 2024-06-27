import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FinnhubService } from './finnhub.service';
import { StockDisplayComponent } from './random-stocks/random-stocks.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ComprarComponent } from './comprar/comprar.component';
import { VenderComponent } from './vender/vender.component';

@NgModule({
  declarations: [
    AppComponent,
    StockDisplayComponent,
    ComprarComponent,
    VenderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    FormsModule
  ],
  providers: [FinnhubService],
  bootstrap: [AppComponent]
})
export class AppModule { }
