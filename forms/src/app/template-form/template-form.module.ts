import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TemplateFormComponent } from './template-form.component';
import { FormDebugComponent } from '../form-debug/form-debug.component';
import { CampoControlErroComponent } from '../campo-control-erro/campo-control-erro.component';

const MODULES = [CommonModule, FormsModule];
const COMPONENTS = [TemplateFormComponent, FormDebugComponent, CampoControlErroComponent];

@NgModule({
  declarations: [COMPONENTS],
  imports: [MODULES],
})
export class TemplateFormModule {}
