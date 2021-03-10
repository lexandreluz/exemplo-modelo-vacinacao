import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDoenca } from 'app/shared/model/doenca.model';
import { DoencaService } from './doenca.service';

@Component({
  templateUrl: './doenca-delete-dialog.component.html',
})
export class DoencaDeleteDialogComponent {
  doenca?: IDoenca;

  constructor(protected doencaService: DoencaService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.doencaService.delete(id).subscribe(() => {
      this.eventManager.broadcast('doencaListModification');
      this.activeModal.close();
    });
  }
}
