import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploadFileRoutingModule } from './upload-file-routing.module';
import { UploadFileComponent } from './upload-file/upload-file.component';

const COMPONENTES = [UploadFileComponent];

const MODULES = [CommonModule, UploadFileRoutingModule];

@NgModule({
  declarations: [COMPONENTES],
  imports: [MODULES],
})
export class UploadFileModule {}
