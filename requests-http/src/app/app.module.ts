import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';

const COMPONENTES = [AppComponent];

const MODULES = [
  BrowserModule,
  AppRoutingModule,
  HttpClientModule,
  SharedModule,
  ModalModule.forRoot(),
];

@NgModule({
  declarations: [COMPONENTES],
  imports: [MODULES],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
