import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IVacina } from 'app/shared/model/vacina.model';
import { VacinaService } from './vacina.service';
import { VacinaDeleteDialogComponent } from './vacina-delete-dialog.component';

@Component({
  selector: 'jhi-vacina',
  templateUrl: './vacina.component.html',
})
export class VacinaComponent implements OnInit, OnDestroy {
  vacinas?: IVacina[];
  eventSubscriber?: Subscription;

  constructor(protected vacinaService: VacinaService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.vacinaService.query().subscribe((res: HttpResponse<IVacina[]>) => (this.vacinas = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInVacinas();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IVacina): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInVacinas(): void {
    this.eventSubscriber = this.eventManager.subscribe('vacinaListModification', () => this.loadAll());
  }

  delete(vacina: IVacina): void {
    const modalRef = this.modalService.open(VacinaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.vacina = vacina;
  }
}
