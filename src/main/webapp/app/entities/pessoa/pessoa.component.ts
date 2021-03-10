import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPessoa } from 'app/shared/model/pessoa.model';
import { PessoaService } from './pessoa.service';
import { PessoaDeleteDialogComponent } from './pessoa-delete-dialog.component';

@Component({
  selector: 'jhi-pessoa',
  templateUrl: './pessoa.component.html',
})
export class PessoaComponent implements OnInit, OnDestroy {
  pessoas?: IPessoa[];
  eventSubscriber?: Subscription;

  constructor(protected pessoaService: PessoaService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.pessoaService.query().subscribe((res: HttpResponse<IPessoa[]>) => (this.pessoas = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInPessoas();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IPessoa): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInPessoas(): void {
    this.eventSubscriber = this.eventManager.subscribe('pessoaListModification', () => this.loadAll());
  }

  delete(pessoa: IPessoa): void {
    const modalRef = this.modalService.open(PessoaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.pessoa = pessoa;
  }
}
