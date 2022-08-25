import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { CursosModule } from './cursos/cursos.module';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

const MODULES = [
  BrowserModule,
  AppRoutingModule,
  FormsModule,
  BrowserAnimationsModule,
  MatToolbarModule,
  MatMenuModule,
  MatIconModule,
  MatTableModule,
  CursosModule,
]

@NgModule({
  declarations: [AppComponent, HomeComponent, LoginComponent],
  imports: [MODULES],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
