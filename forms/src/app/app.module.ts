import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataFormComponent } from './data-form/data-form.component';

const MODULES = [BrowserModule, AppRoutingModule, BrowserAnimationsModule, FormsModule];
const COMPONENTS = [AppComponent, DataFormComponent];

@NgModule({
  declarations: [COMPONENTS],
  imports: [MODULES],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
