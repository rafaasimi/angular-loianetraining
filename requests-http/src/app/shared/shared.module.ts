import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';

const COMPONENTES = [AlertModalComponent, ConfirmModalComponent];

@NgModule({
  declarations: [COMPONENTES],
  imports: [CommonModule],
  exports: [COMPONENTES],
})
export class SharedModule {}
