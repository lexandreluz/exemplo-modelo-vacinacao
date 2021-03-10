import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPessoa } from 'app/shared/model/pessoa.model';
import { PessoaService } from './pessoa.service';

@Component({
  templateUrl: './pessoa-delete-dialog.component.html',
})
export class PessoaDeleteDialogComponent {
  pessoa?: IPessoa;

  constructor(protected pessoaService: PessoaService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.pessoaService.delete(id).subscribe(() => {
      this.eventManager.broadcast('pessoaListModification');
      this.activeModal.close();
    });
  }
}
