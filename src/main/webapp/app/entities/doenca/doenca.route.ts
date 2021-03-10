import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IDoenca, Doenca } from 'app/shared/model/doenca.model';
import { DoencaService } from './doenca.service';
import { DoencaComponent } from './doenca.component';
import { DoencaDetailComponent } from './doenca-detail.component';
import { DoencaUpdateComponent } from './doenca-update.component';

@Injectable({ providedIn: 'root' })
export class DoencaResolve implements Resolve<IDoenca> {
  constructor(private service: DoencaService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDoenca> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((doenca: HttpResponse<Doenca>) => {
          if (doenca.body) {
            return of(doenca.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Doenca());
  }
}

export const doencaRoute: Routes = [
  {
    path: '',
    component: DoencaComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'exemploVacinacaoApp.doenca.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DoencaDetailComponent,
    resolve: {
      doenca: DoencaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'exemploVacinacaoApp.doenca.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DoencaUpdateComponent,
    resolve: {
      doenca: DoencaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'exemploVacinacaoApp.doenca.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DoencaUpdateComponent,
    resolve: {
      doenca: DoencaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'exemploVacinacaoApp.doenca.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
