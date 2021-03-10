import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IPais, Pais } from 'app/shared/model/pais.model';
import { PaisService } from './pais.service';

@Component({
  selector: 'jhi-pais-update',
  templateUrl: './pais-update.component.html',
})
export class PaisUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nome: [],
    sigla: [],
  });

  constructor(protected paisService: PaisService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ pais }) => {
      this.updateForm(pais);
    });
  }

  updateForm(pais: IPais): void {
    this.editForm.patchValue({
      id: pais.id,
      nome: pais.nome,
      sigla: pais.sigla,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const pais = this.createFromForm();
    if (pais.id !== undefined) {
      this.subscribeToSaveResponse(this.paisService.update(pais));
    } else {
      this.subscribeToSaveResponse(this.paisService.create(pais));
    }
  }

  private createFromForm(): IPais {
    return {
      ...new Pais(),
      id: this.editForm.get(['id'])!.value,
      nome: this.editForm.get(['nome'])!.value,
      sigla: this.editForm.get(['sigla'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPais>>): void {
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
}
