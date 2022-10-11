import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataFormComponent } from './data-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';

const COMPONENTS = [DataFormComponent];

const MODULES = [CommonModule, ReactiveFormsModule, SharedModule, HttpClientModule];

@NgModule({
  declarations: [COMPONENTS],
  imports: [MODULES],
})
export class DataFormModule {}
