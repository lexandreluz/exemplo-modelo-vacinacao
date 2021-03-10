import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IFabricante } from 'app/shared/model/fabricante.model';

type EntityResponseType = HttpResponse<IFabricante>;
type EntityArrayResponseType = HttpResponse<IFabricante[]>;

@Injectable({ providedIn: 'root' })
export class FabricanteService {
  public resourceUrl = SERVER_API_URL + 'api/fabricantes';

  constructor(protected http: HttpClient) {}

  create(fabricante: IFabricante): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(fabricante);
    return this.http
      .post<IFabricante>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(fabricante: IFabricante): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(fabricante);
    return this.http
      .put<IFabricante>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IFabricante>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IFabricante[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(fabricante: IFabricante): IFabricante {
    const copy: IFabricante = Object.assign({}, fabricante, {
      criado: fabricante.criado && fabricante.criado.isValid() ? fabricante.criado.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.criado = res.body.criado ? moment(res.body.criado) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((fabricante: IFabricante) => {
        fabricante.criado = fabricante.criado ? moment(fabricante.criado) : undefined;
      });
    }
    return res;
  }
}
