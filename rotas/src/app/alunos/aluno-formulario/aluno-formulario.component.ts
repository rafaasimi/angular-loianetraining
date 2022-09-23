import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlunosService } from '../alunos.service';

@Component({
  selector: 'app-aluno-formulario',
  templateUrl: './aluno-formulario.component.html',
  styleUrls: ['./aluno-formulario.component.scss'],
})
export class AlunoFormularioComponent implements OnInit, OnDestroy {
  aluno: any = {};
  inscricao: Subscription = new Subscription();
  private formMudou: boolean = false;

  constructor(
    private alunoService: AlunosService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.inscricao = this.route.params.subscribe((params) => {
      let id = params['id'];

      this.aluno = this.alunoService.getAluno(id);

      if (this.aluno === null) {
        this.aluno = {};
      }
    });
  }

  ngOnDestroy(): void {
    this.inscricao.unsubscribe();
  }

  onInput() {
    this.formMudou = true;
  }

  podeMudarRota() {
    
    if(this.formMudou) {
      const result = confirm('Existem dados que podem ser perdidos. Gostaria mesmo de trocar de página?')

      if(result) {
        return true
      }

      return false;
    }

    return true;
  }
}
