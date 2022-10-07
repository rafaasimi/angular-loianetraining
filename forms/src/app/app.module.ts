import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataFormComponent } from './data-form/data-form.component';
import { TemplateFormModule } from './template-form/template-form.module';

const MODULES = [BrowserModule, AppRoutingModule, BrowserAnimationsModule, TemplateFormModule, HttpClientModule];
const COMPONENTS = [AppComponent, DataFormComponent];

@NgModule({
  declarations: [COMPONENTS],
  imports: [MODULES],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
