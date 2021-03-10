import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPais } from 'app/shared/model/pais.model';
import { PaisService } from './pais.service';

@Component({
  templateUrl: './pais-delete-dialog.component.html',
})
export class PaisDeleteDialogComponent {
  pais?: IPais;

  constructor(protected paisService: PaisService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.paisService.delete(id).subscribe(() => {
      this.eventManager.broadcast('paisListModification');
      this.activeModal.close();
    });
  }
}
