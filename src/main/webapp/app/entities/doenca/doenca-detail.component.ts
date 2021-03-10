import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDoenca } from 'app/shared/model/doenca.model';

@Component({
  selector: 'jhi-doenca-detail',
  templateUrl: './doenca-detail.component.html',
})
export class DoencaDetailComponent implements OnInit {
  doenca: IDoenca | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ doenca }) => (this.doenca = doenca));
  }

  previousState(): void {
    window.history.back();
  }
}
