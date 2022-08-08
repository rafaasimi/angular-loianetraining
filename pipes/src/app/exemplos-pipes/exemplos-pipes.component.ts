import { Component, OnInit } from '@angular/core';

import { interval, Observable, timer } from 'rxjs';

@Component({
  selector: 'app-exemplos-pipes',
  templateUrl: './exemplos-pipes.component.html',
  styleUrls: ['./exemplos-pipes.component.css'],
})
export class ExemplosPipesComponent implements OnInit {
  livro: any = {
    titulo: 'Aprendendo Estrutura de Dados JavaScript e Algoritimos',
    rating: 4.54321,
    numeroPaginas: 314,
    preco: 44.99,
    dataLancamento: new Date(2016, 5, 23),
    url: 'http://rafaelsimionato.dev',
  };

  livros: string[] = ['Angular', 'React', 'VueJS'];
  filtro: any ;

  addCurso(valor: any) {
    this.livros.push(valor)
  }

  obterCursos() {
    if(this.livros.length === 0 || this.filtro === undefined || this.filtro.trim() === '') {
      return this.livros
    }

    return this.livros.filter((v) => {
      if(v.toLowerCase().indexOf(this.filtro.toLowerCase()) >= 0) {
        return true
      }
      return false
    })
  }

  valorAsync = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Valor assíncrono')
    }, 2000)
  })


  constructor() {}

  ngOnInit(): void {}
}
