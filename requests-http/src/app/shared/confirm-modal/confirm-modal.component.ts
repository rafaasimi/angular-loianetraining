import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {

  @Input() title: string = '';
  @Input() message: string = '';
  @Input() cancelTxt = 'Cancelar';
  @Input() confirmTxt = 'Confirmar';

  confirmResult: Subject<boolean>

  constructor(public bsModalRef: BsModalRef) { 
    this.confirmResult = new Subject<boolean>();
  }

  ngOnInit(): void {
  }

  onConfirm() {
    this.confirmAndClose(true)
  }

  onClose() {
    this.confirmAndClose(false)
  }

  private confirmAndClose(value: boolean) {
    this.confirmResult.next(value);
    this.bsModalRef.hide();
  }
}
