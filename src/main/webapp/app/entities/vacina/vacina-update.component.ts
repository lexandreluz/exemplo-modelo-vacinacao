import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IVacina, Vacina } from 'app/shared/model/vacina.model';
import { VacinaService } from './vacina.service';
import { IDoenca } from 'app/shared/model/doenca.model';
import { DoencaService } from 'app/entities/doenca/doenca.service';

@Component({
  selector: 'jhi-vacina-update',
  templateUrl: './vacina-update.component.html',
})
export class VacinaUpdateComponent implements OnInit {
  isSaving = false;
  doencas: IDoenca[] = [];

  editForm = this.fb.group({
    id: [],
    nome: [],
    criada: [],
    doenca: [],
  });

  constructor(
    protected vacinaService: VacinaService,
    protected doencaService: DoencaService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ vacina }) => {
      if (!vacina.id) {
        const today = moment().startOf('day');
        vacina.criada = today;
      }

      this.updateForm(vacina);

      this.doencaService.query().subscribe((res: HttpResponse<IDoenca[]>) => (this.doencas = res.body || []));
    });
  }

  updateForm(vacina: IVacina): void {
    this.editForm.patchValue({
      id: vacina.id,
      nome: vacina.nome,
      criada: vacina.criada ? vacina.criada.format(DATE_TIME_FORMAT) : null,
      doenca: vacina.doenca,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const vacina = this.createFromForm();
    if (vacina.id !== undefined) {
      this.subscribeToSaveResponse(this.vacinaService.update(vacina));
    } else {
      this.subscribeToSaveResponse(this.vacinaService.create(vacina));
    }
  }

  private createFromForm(): IVacina {
    return {
      ...new Vacina(),
      id: this.editForm.get(['id'])!.value,
      nome: this.editForm.get(['nome'])!.value,
      criada: this.editForm.get(['criada'])!.value ? moment(this.editForm.get(['criada'])!.value, DATE_TIME_FORMAT) : undefined,
      doenca: this.editForm.get(['doenca'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IVacina>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IDoenca): any {
    return item.id;
  }
}
