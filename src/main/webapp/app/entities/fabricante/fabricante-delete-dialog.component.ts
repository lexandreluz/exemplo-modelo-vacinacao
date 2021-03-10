import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFabricante } from 'app/shared/model/fabricante.model';
import { FabricanteService } from './fabricante.service';

@Component({
  templateUrl: './fabricante-delete-dialog.component.html',
})
export class FabricanteDeleteDialogComponent {
  fabricante?: IFabricante;

  constructor(
    protected fabricanteService: FabricanteService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.fabricanteService.delete(id).subscribe(() => {
      this.eventManager.broadcast('fabricanteListModification');
      this.activeModal.close();
    });
  }
}
