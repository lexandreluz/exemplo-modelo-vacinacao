import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IDoenca } from 'app/shared/model/doenca.model';
import { DoencaService } from './doenca.service';
import { DoencaDeleteDialogComponent } from './doenca-delete-dialog.component';

@Component({
  selector: 'jhi-doenca',
  templateUrl: './doenca.component.html',
})
export class DoencaComponent implements OnInit, OnDestroy {
  doencas?: IDoenca[];
  eventSubscriber?: Subscription;

  constructor(protected doencaService: DoencaService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.doencaService.query().subscribe((res: HttpResponse<IDoenca[]>) => (this.doencas = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInDoencas();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IDoenca): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInDoencas(): void {
    this.eventSubscriber = this.eventManager.subscribe('doencaListModification', () => this.loadAll());
  }

  delete(doenca: IDoenca): void {
    const modalRef = this.modalService.open(DoencaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.doenca = doenca;
  }
}
