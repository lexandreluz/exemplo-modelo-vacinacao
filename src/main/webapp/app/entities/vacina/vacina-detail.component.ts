import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IVacina } from 'app/shared/model/vacina.model';

@Component({
  selector: 'jhi-vacina-detail',
  templateUrl: './vacina-detail.component.html',
})
export class VacinaDetailComponent implements OnInit {
  vacina: IVacina | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ vacina }) => (this.vacina = vacina));
  }

  previousState(): void {
    window.history.back();
  }
}
