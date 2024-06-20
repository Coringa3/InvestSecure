import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FinnhubService } from './finnhub.service';
import { StockDisplayComponent } from './random-stocks/random-stocks.component';

@NgModule({
  declarations: [
    AppComponent,
    StockDisplayComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [FinnhubService],
  bootstrap: [AppComponent]
})
export class AppModule { }
