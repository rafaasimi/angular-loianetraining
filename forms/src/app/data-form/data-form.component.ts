import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.scss']
})
export class DataFormComponent implements OnInit {

  formulario: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    // 1ª FORMA DE CRIAR FORMULARIO
    // this.formulario = new FormGroup({
    //   nome: new FormControl('Rafael'),
    //   email: new FormControl(null),
    // });

    // 2º FORMA DE CRIAR FORMULARIO
    this.formulario = this.formBuilder.group({
      nome: [null],
      email: [null],
    })

  }

}
