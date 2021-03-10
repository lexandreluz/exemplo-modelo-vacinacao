import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IVacinacaoPessoa } from 'app/shared/model/vacinacao-pessoa.model';

@Component({
  selector: 'jhi-vacinacao-pessoa-detail',
  templateUrl: './vacinacao-pessoa-detail.component.html',
})
export class VacinacaoPessoaDetailComponent implements OnInit {
  vacinacaoPessoa: IVacinacaoPessoa | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ vacinacaoPessoa }) => (this.vacinacaoPessoa = vacinacaoPessoa));
  }

  previousState(): void {
    window.history.back();
  }
}
