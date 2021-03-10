import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IPais, Pais } from 'app/shared/model/pais.model';
import { PaisService } from './pais.service';
import { PaisComponent } from './pais.component';
import { PaisDetailComponent } from './pais-detail.component';
import { PaisUpdateComponent } from './pais-update.component';

@Injectable({ providedIn: 'root' })
export class PaisResolve implements Resolve<IPais> {
  constructor(private service: PaisService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPais> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((pais: HttpResponse<Pais>) => {
          if (pais.body) {
            return of(pais.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Pais());
  }
}

export const paisRoute: Routes = [
  {
    path: '',
    component: PaisComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'exemploVacinacaoApp.pais.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PaisDetailComponent,
    resolve: {
      pais: PaisResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'exemploVacinacaoApp.pais.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PaisUpdateComponent,
    resolve: {
      pais: PaisResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'exemploVacinacaoApp.pais.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PaisUpdateComponent,
    resolve: {
      pais: PaisResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'exemploVacinacaoApp.pais.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
