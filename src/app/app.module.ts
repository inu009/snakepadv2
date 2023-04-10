import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SnakeCardComponent } from './components/snake-card/snake-card.component';
import { SnakeCardContainerComponent } from './components/snake-card-container/snake-card-container.component';

@NgModule({
  declarations: [AppComponent, SnakeCardComponent, SnakeCardContainerComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
