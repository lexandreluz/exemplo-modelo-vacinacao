import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IFabricante, Fabricante } from 'app/shared/model/fabricante.model';
import { FabricanteService } from './fabricante.service';
import { FabricanteComponent } from './fabricante.component';
import { FabricanteDetailComponent } from './fabricante-detail.component';
import { FabricanteUpdateComponent } from './fabricante-update.component';

@Injectable({ providedIn: 'root' })
export class FabricanteResolve implements Resolve<IFabricante> {
  constructor(private service: FabricanteService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IFabricante> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((fabricante: HttpResponse<Fabricante>) => {
          if (fabricante.body) {
            return of(fabricante.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Fabricante());
  }
}

export const fabricanteRoute: Routes = [
  {
    path: '',
    component: FabricanteComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'exemploVacinacaoApp.fabricante.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: FabricanteDetailComponent,
    resolve: {
      fabricante: FabricanteResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'exemploVacinacaoApp.fabricante.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: FabricanteUpdateComponent,
    resolve: {
      fabricante: FabricanteResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'exemploVacinacaoApp.fabricante.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: FabricanteUpdateComponent,
    resolve: {
      fabricante: FabricanteResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'exemploVacinacaoApp.fabricante.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
