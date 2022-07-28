import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-exemplo-ng-content',
  templateUrl: './exemplo-ng-content.component.html',
  styleUrls: ['./exemplo-ng-content.component.scss']
})
export class ExemploNgContentComponent {

  @Input() titulo: string = '';

  constructor() { }

}
