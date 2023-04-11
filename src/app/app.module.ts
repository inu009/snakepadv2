import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SnakeCardComponent } from './components/snake-card/snake-card.component';
import { SnakeCardContainerComponent } from './components/snake-card-container/snake-card-container.component';
import { HeaderComponent } from './components/header/header.component';
import { AddSnakeFormComponent } from './components/add-snake-form/add-snake-form.component';
import { ButtonComponent } from './components/button/button.component';

@NgModule({
  declarations: [
    AppComponent,
    SnakeCardComponent,
    SnakeCardContainerComponent,
    HeaderComponent,
    AddSnakeFormComponent,
    ButtonComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
