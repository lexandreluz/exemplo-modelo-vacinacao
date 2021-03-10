import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPais } from 'app/shared/model/pais.model';
import { PaisService } from './pais.service';
import { PaisDeleteDialogComponent } from './pais-delete-dialog.component';

@Component({
  selector: 'jhi-pais',
  templateUrl: './pais.component.html',
})
export class PaisComponent implements OnInit, OnDestroy {
  pais?: IPais[];
  eventSubscriber?: Subscription;

  constructor(protected paisService: PaisService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.paisService.query().subscribe((res: HttpResponse<IPais[]>) => (this.pais = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInPais();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IPais): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInPais(): void {
    this.eventSubscriber = this.eventManager.subscribe('paisListModification', () => this.loadAll());
  }

  delete(pais: IPais): void {
    const modalRef = this.modalService.open(PaisDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.pais = pais;
  }
}
