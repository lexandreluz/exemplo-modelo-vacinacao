import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IVacina, Vacina } from 'app/shared/model/vacina.model';
import { VacinaService } from './vacina.service';
import { VacinaComponent } from './vacina.component';
import { VacinaDetailComponent } from './vacina-detail.component';
import { VacinaUpdateComponent } from './vacina-update.component';

@Injectable({ providedIn: 'root' })
export class VacinaResolve implements Resolve<IVacina> {
  constructor(private service: VacinaService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IVacina> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((vacina: HttpResponse<Vacina>) => {
          if (vacina.body) {
            return of(vacina.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Vacina());
  }
}

export const vacinaRoute: Routes = [
  {
    path: '',
    component: VacinaComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'exemploVacinacaoApp.vacina.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: VacinaDetailComponent,
    resolve: {
      vacina: VacinaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'exemploVacinacaoApp.vacina.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: VacinaUpdateComponent,
    resolve: {
      vacina: VacinaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'exemploVacinacaoApp.vacina.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: VacinaUpdateComponent,
    resolve: {
      vacina: VacinaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'exemploVacinacaoApp.vacina.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
