import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IPessoa, Pessoa } from 'app/shared/model/pessoa.model';
import { PessoaService } from './pessoa.service';
import { PessoaComponent } from './pessoa.component';
import { PessoaDetailComponent } from './pessoa-detail.component';
import { PessoaUpdateComponent } from './pessoa-update.component';

@Injectable({ providedIn: 'root' })
export class PessoaResolve implements Resolve<IPessoa> {
  constructor(private service: PessoaService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPessoa> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((pessoa: HttpResponse<Pessoa>) => {
          if (pessoa.body) {
            return of(pessoa.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Pessoa());
  }
}

export const pessoaRoute: Routes = [
  {
    path: '',
    component: PessoaComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'exemploVacinacaoApp.pessoa.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PessoaDetailComponent,
    resolve: {
      pessoa: PessoaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'exemploVacinacaoApp.pessoa.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PessoaUpdateComponent,
    resolve: {
      pessoa: PessoaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'exemploVacinacaoApp.pessoa.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PessoaUpdateComponent,
    resolve: {
      pessoa: PessoaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'exemploVacinacaoApp.pessoa.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
