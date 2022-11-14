import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

const COMPONENTES = [AppComponent];

const MODULES = [BrowserModule, AppRoutingModule, HttpClientModule];

@NgModule({
  declarations: [COMPONENTES],
  imports: [MODULES],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
