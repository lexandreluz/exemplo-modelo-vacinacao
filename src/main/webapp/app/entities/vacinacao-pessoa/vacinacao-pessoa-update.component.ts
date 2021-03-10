import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IVacinacaoPessoa, VacinacaoPessoa } from 'app/shared/model/vacinacao-pessoa.model';
import { VacinacaoPessoaService } from './vacinacao-pessoa.service';
import { IPessoa } from 'app/shared/model/pessoa.model';
import { PessoaService } from 'app/entities/pessoa/pessoa.service';
import { IVacina } from 'app/shared/model/vacina.model';
import { VacinaService } from 'app/entities/vacina/vacina.service';
import { IFabricante } from 'app/shared/model/fabricante.model';
import { FabricanteService } from 'app/entities/fabricante/fabricante.service';

type SelectableEntity = IPessoa | IVacina | IFabricante;

@Component({
  selector: 'jhi-vacinacao-pessoa-update',
  templateUrl: './vacinacao-pessoa-update.component.html',
})
export class VacinacaoPessoaUpdateComponent implements OnInit {
  isSaving = false;
  pessoas: IPessoa[] = [];
  vacinas: IVacina[] = [];
  fabricantes: IFabricante[] = [];
  quandoDp: any;

  editForm = this.fb.group({
    id: [],
    quando: [],
    cns: [],
    pessoa: [],
    vacina: [],
    vacina: [],
  });

  constructor(
    protected vacinacaoPessoaService: VacinacaoPessoaService,
    protected pessoaService: PessoaService,
    protected vacinaService: VacinaService,
    protected fabricanteService: FabricanteService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ vacinacaoPessoa }) => {
      this.updateForm(vacinacaoPessoa);

      this.pessoaService.query().subscribe((res: HttpResponse<IPessoa[]>) => (this.pessoas = res.body || []));

      this.vacinaService.query().subscribe((res: HttpResponse<IVacina[]>) => (this.vacinas = res.body || []));

      this.fabricanteService.query().subscribe((res: HttpResponse<IFabricante[]>) => (this.fabricantes = res.body || []));
    });
  }

  updateForm(vacinacaoPessoa: IVacinacaoPessoa): void {
    this.editForm.patchValue({
      id: vacinacaoPessoa.id,
      quando: vacinacaoPessoa.quando,
      cns: vacinacaoPessoa.cns,
      pessoa: vacinacaoPessoa.pessoa,
      vacina: vacinacaoPessoa.vacina,
      vacina: vacinacaoPessoa.vacina,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const vacinacaoPessoa = this.createFromForm();
    if (vacinacaoPessoa.id !== undefined) {
      this.subscribeToSaveResponse(this.vacinacaoPessoaService.update(vacinacaoPessoa));
    } else {
      this.subscribeToSaveResponse(this.vacinacaoPessoaService.create(vacinacaoPessoa));
    }
  }

  private createFromForm(): IVacinacaoPessoa {
    return {
      ...new VacinacaoPessoa(),
      id: this.editForm.get(['id'])!.value,
      quando: this.editForm.get(['quando'])!.value,
      cns: this.editForm.get(['cns'])!.value,
      pessoa: this.editForm.get(['pessoa'])!.value,
      vacina: this.editForm.get(['vacina'])!.value,
      vacina: this.editForm.get(['vacina'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IVacinacaoPessoa>>): void {
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

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
