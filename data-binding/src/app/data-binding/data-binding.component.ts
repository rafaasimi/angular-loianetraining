import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-binding',
  templateUrl: './data-binding.component.html',
  styleUrls: ['./data-binding.component.css'],
})
export class DataBindingComponent{

  url: string = 'https://www.rafaelsimionato.dev';
  cursoAngular: boolean = true;
  valorAtual: string = '';
  valorSalvo: string = '';

  urlImagem: string = 'http://lorempixel.com.br/400/200';


  getValor() {
    return 1;
  }

  getCurtirCurso() {
    return true;
  }

  botaoClicado() {
    alert('Clicado.');
  }

  isMouseOver: boolean = false

  onKeyUp(event: KeyboardEvent) {
    this.valorAtual += event.key;
  }

  salvarValor(event: any) {
    this.valorSalvo = event;
  }

  onMouseOverOut() {
    this.isMouseOver = !this.isMouseOver
  }


  nome: string = 'ABC';
}
