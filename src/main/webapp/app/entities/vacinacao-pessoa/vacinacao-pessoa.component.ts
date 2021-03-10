import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IVacinacaoPessoa } from 'app/shared/model/vacinacao-pessoa.model';
import { VacinacaoPessoaService } from './vacinacao-pessoa.service';
import { VacinacaoPessoaDeleteDialogComponent } from './vacinacao-pessoa-delete-dialog.component';

@Component({
  selector: 'jhi-vacinacao-pessoa',
  templateUrl: './vacinacao-pessoa.component.html',
})
export class VacinacaoPessoaComponent implements OnInit, OnDestroy {
  vacinacaoPessoas?: IVacinacaoPessoa[];
  eventSubscriber?: Subscription;

  constructor(
    protected vacinacaoPessoaService: VacinacaoPessoaService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.vacinacaoPessoaService.query().subscribe((res: HttpResponse<IVacinacaoPessoa[]>) => (this.vacinacaoPessoas = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInVacinacaoPessoas();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IVacinacaoPessoa): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInVacinacaoPessoas(): void {
    this.eventSubscriber = this.eventManager.subscribe('vacinacaoPessoaListModification', () => this.loadAll());
  }

  delete(vacinacaoPessoa: IVacinacaoPessoa): void {
    const modalRef = this.modalService.open(VacinacaoPessoaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.vacinacaoPessoa = vacinacaoPessoa;
  }
}
