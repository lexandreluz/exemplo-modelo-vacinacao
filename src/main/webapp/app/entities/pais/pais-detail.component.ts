import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPais } from 'app/shared/model/pais.model';

@Component({
  selector: 'jhi-pais-detail',
  templateUrl: './pais-detail.component.html',
})
export class PaisDetailComponent implements OnInit {
  pais: IPais | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ pais }) => (this.pais = pais));
  }

  previousState(): void {
    window.history.back();
  }
}
