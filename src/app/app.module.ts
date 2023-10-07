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
import { SnakePageComponent } from './components/snake-page/snake-page.component';
import { SnakePageInfoComponent } from './components/snake-page-info/snake-page-info.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { RecordAddFormComponent } from './components/record-add-form/record-add-form.component';
import { RecordSelectComponent } from './components/record-select/record-select.component';
import { RecordContainerComponent } from './components/record-container/record-container.component';
import { RecordButtonComponent } from './components/record-button/record-button.component';
import { OverrideSetComponent } from './components/override-set/override-set.component';

@NgModule({
  declarations: [
    AppComponent,
    SnakeCardComponent,
    SnakeCardContainerComponent,
    HeaderComponent,
    AddSnakeFormComponent,
    ButtonComponent,
    SnakePageComponent,
    SnakePageInfoComponent,
    NavBarComponent,
    RecordAddFormComponent,
    RecordSelectComponent,
    RecordContainerComponent,
    RecordButtonComponent,
    OverrideSetComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
