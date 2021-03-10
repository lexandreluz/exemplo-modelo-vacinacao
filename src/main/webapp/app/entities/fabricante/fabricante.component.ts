import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IFabricante } from 'app/shared/model/fabricante.model';
import { FabricanteService } from './fabricante.service';
import { FabricanteDeleteDialogComponent } from './fabricante-delete-dialog.component';

@Component({
  selector: 'jhi-fabricante',
  templateUrl: './fabricante.component.html',
})
export class FabricanteComponent implements OnInit, OnDestroy {
  fabricantes?: IFabricante[];
  eventSubscriber?: Subscription;

  constructor(protected fabricanteService: FabricanteService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.fabricanteService.query().subscribe((res: HttpResponse<IFabricante[]>) => (this.fabricantes = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInFabricantes();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IFabricante): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInFabricantes(): void {
    this.eventSubscriber = this.eventManager.subscribe('fabricanteListModification', () => this.loadAll());
  }

  delete(fabricante: IFabricante): void {
    const modalRef = this.modalService.open(FabricanteDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.fabricante = fabricante;
  }
}
