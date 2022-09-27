import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlunosService } from '../alunos.service';

@Component({
  selector: 'app-aluno-detalhe',
  templateUrl: './aluno-detalhe.component.html',
  styleUrls: ['./aluno-detalhe.component.scss']
})
export class AlunoDetalheComponent implements OnInit, OnDestroy {
  aluno: any = {};
  inscricao: Subscription = new Subscription();

  constructor(private alunoService: AlunosService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    // this.inscricao = this.route.params.subscribe((params) => {
    //   let id = params['id'];

    //   this.aluno = this.alunoService.getAluno(id);

    // });

    console.log('ngOnInit: AlunoDetalheComponent')

    this.inscricao = this.route.data.subscribe(
      (info) => {
        console.log('Recebendo o objeto Aluno do Resolver')
        this.aluno = info['aluno']
      }
    )
  }

  ngOnDestroy() {
    this.inscricao.unsubscribe();
  }

  editarContato() {
    this.router.navigate(['/alunos',this.aluno.id,'editar'])
  }

}
