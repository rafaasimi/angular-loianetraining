import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertModalComponent } from './alert-modal/alert-modal.component';

const COMPONENTES = [AlertModalComponent];

@NgModule({
  declarations: [AlertModalComponent],
  imports: [CommonModule],
  exports: [COMPONENTES],
})
export class SharedModule {}
