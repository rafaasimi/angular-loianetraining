import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TemplateFormComponent } from './template-form.component';

const MODULES = [CommonModule, FormsModule];
const COMPONENTS = [TemplateFormComponent];

@NgModule({
  declarations: [COMPONENTS],
  imports: [MODULES],
})
export class TemplateFormModule {}
