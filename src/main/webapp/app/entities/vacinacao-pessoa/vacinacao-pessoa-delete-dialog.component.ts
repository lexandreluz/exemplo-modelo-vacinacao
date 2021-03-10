import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IVacinacaoPessoa } from 'app/shared/model/vacinacao-pessoa.model';
import { VacinacaoPessoaService } from './vacinacao-pessoa.service';

@Component({
  templateUrl: './vacinacao-pessoa-delete-dialog.component.html',
})
export class VacinacaoPessoaDeleteDialogComponent {
  vacinacaoPessoa?: IVacinacaoPessoa;

  constructor(
    protected vacinacaoPessoaService: VacinacaoPessoaService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.vacinacaoPessoaService.delete(id).subscribe(() => {
      this.eventManager.broadcast('vacinacaoPessoaListModification');
      this.activeModal.close();
    });
  }
}
