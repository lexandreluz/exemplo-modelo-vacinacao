import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IVacina } from 'app/shared/model/vacina.model';
import { VacinaService } from './vacina.service';

@Component({
  templateUrl: './vacina-delete-dialog.component.html',
})
export class VacinaDeleteDialogComponent {
  vacina?: IVacina;

  constructor(protected vacinaService: VacinaService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.vacinaService.delete(id).subscribe(() => {
      this.eventManager.broadcast('vacinaListModification');
      this.activeModal.close();
    });
  }
}
