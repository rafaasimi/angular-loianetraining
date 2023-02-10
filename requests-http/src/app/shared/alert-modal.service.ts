import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';

enum AlertTypes {
  DANGER = 'danger',
  SUCCESS = 'success',
}

@Injectable({
  providedIn: 'root',
})
export class AlertModalServiceService {
  constructor(private modalService: BsModalService) {}

  private showAlert(message: string, type: AlertTypes, dismissTimeout?: number) {
    const bsModalRef: BsModalRef = this.modalService.show(AlertModalComponent);
    bsModalRef.content.type = type;
    bsModalRef.content.message = message;
    
    if(dismissTimeout) {
      setTimeout(() => bsModalRef.hide(), dismissTimeout);
    }
  }

  showAlertDanger(message: string) {
    this.showAlert(message, AlertTypes.DANGER, 3000);
  }

  showAlertSuccess(message: string) {
    this.showAlert(message, AlertTypes.SUCCESS, 3000);
  }

  showConfirm(title: string, message: string, confirmTxt?: string, cancelTxt?: string) {
    const bsModalRef: BsModalRef = this.modalService.show(ConfirmModalComponent);
    bsModalRef.content.title = title;
    bsModalRef.content.message = message;

    if(confirmTxt) {
      bsModalRef.content.confirmTxt = confirmTxt;
    }

    if(cancelTxt) {
      bsModalRef.content.cancelTxt = cancelTxt;
    }

    return (<ConfirmModalComponent>bsModalRef.content).confirmResult;
    
  }
}
