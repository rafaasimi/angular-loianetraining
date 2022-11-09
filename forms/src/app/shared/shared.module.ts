import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampoControlErroComponent } from './campo-control-erro/campo-control-erro.component';
import { FormDebugComponent } from './form-debug/form-debug.component';
import { DropdownService } from './services/dropdown.service';
import { ErrorMsgComponent } from './error-msg/error-msg.component';
import { InputFieldComponent } from './input-field/input-field.component';
import { FormsModule } from '@angular/forms';
import { BaseFormComponent } from './base-form/base-form.component';

const COMPONENTS = [
  CampoControlErroComponent,
  FormDebugComponent,
  ErrorMsgComponent,
  InputFieldComponent,
  BaseFormComponent,
];

const MODULES = [CommonModule, FormsModule];

const SERVICES = [DropdownService];

@NgModule({
  declarations: [COMPONENTS],
  imports: [MODULES],
  exports: [COMPONENTS],
  providers: [SERVICES],
})
export class SharedModule {}
