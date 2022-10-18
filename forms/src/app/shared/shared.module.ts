import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampoControlErroComponent } from './campo-control-erro/campo-control-erro.component';
import { FormDebugComponent } from './form-debug/form-debug.component';
import { DropdownService } from './services/dropdown.service';

const COMPONENTS = [CampoControlErroComponent, FormDebugComponent];

const MODULES = [CommonModule];

const SERVICES = [DropdownService]

@NgModule({
  declarations: [COMPONENTS],
  imports: [MODULES],
  exports: [COMPONENTS],
  providers: [SERVICES]
})
export class SharedModule {}
