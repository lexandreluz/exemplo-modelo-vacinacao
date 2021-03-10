import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IVacinacaoPessoa, VacinacaoPessoa } from 'app/shared/model/vacinacao-pessoa.model';
import { VacinacaoPessoaService } from './vacinacao-pessoa.service';
import { VacinacaoPessoaComponent } from './vacinacao-pessoa.component';
import { VacinacaoPessoaDetailComponent } from './vacinacao-pessoa-detail.component';
import { VacinacaoPessoaUpdateComponent } from './vacinacao-pessoa-update.component';

@Injectable({ providedIn: 'root' })
export class VacinacaoPessoaResolve implements Resolve<IVacinacaoPessoa> {
  constructor(private service: VacinacaoPessoaService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IVacinacaoPessoa> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((vacinacaoPessoa: HttpResponse<VacinacaoPessoa>) => {
          if (vacinacaoPessoa.body) {
            return of(vacinacaoPessoa.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new VacinacaoPessoa());
  }
}

export const vacinacaoPessoaRoute: Routes = [
  {
    path: '',
    component: VacinacaoPessoaComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'exemploVacinacaoApp.vacinacaoPessoa.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: VacinacaoPessoaDetailComponent,
    resolve: {
      vacinacaoPessoa: VacinacaoPessoaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'exemploVacinacaoApp.vacinacaoPessoa.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: VacinacaoPessoaUpdateComponent,
    resolve: {
      vacinacaoPessoa: VacinacaoPessoaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'exemploVacinacaoApp.vacinacaoPessoa.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: VacinacaoPessoaUpdateComponent,
    resolve: {
      vacinacaoPessoa: VacinacaoPessoaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'exemploVacinacaoApp.vacinacaoPessoa.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
