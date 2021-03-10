import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IDoenca } from 'app/shared/model/doenca.model';

type EntityResponseType = HttpResponse<IDoenca>;
type EntityArrayResponseType = HttpResponse<IDoenca[]>;

@Injectable({ providedIn: 'root' })
export class DoencaService {
  public resourceUrl = SERVER_API_URL + 'api/doencas';

  constructor(protected http: HttpClient) {}

  create(doenca: IDoenca): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(doenca);
    return this.http
      .post<IDoenca>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(doenca: IDoenca): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(doenca);
    return this.http
      .put<IDoenca>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IDoenca>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IDoenca[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(doenca: IDoenca): IDoenca {
    const copy: IDoenca = Object.assign({}, doenca, {
      criado: doenca.criado && doenca.criado.isValid() ? doenca.criado.toJSON() : undefined,
      dataPrimeiroCaso:
        doenca.dataPrimeiroCaso && doenca.dataPrimeiroCaso.isValid() ? doenca.dataPrimeiroCaso.format(DATE_FORMAT) : undefined,
      localPrimeiroCaso:
        doenca.localPrimeiroCaso && doenca.localPrimeiroCaso.isValid() ? doenca.localPrimeiroCaso.format(DATE_FORMAT) : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.criado = res.body.criado ? moment(res.body.criado) : undefined;
      res.body.dataPrimeiroCaso = res.body.dataPrimeiroCaso ? moment(res.body.dataPrimeiroCaso) : undefined;
      res.body.localPrimeiroCaso = res.body.localPrimeiroCaso ? moment(res.body.localPrimeiroCaso) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((doenca: IDoenca) => {
        doenca.criado = doenca.criado ? moment(doenca.criado) : undefined;
        doenca.dataPrimeiroCaso = doenca.dataPrimeiroCaso ? moment(doenca.dataPrimeiroCaso) : undefined;
        doenca.localPrimeiroCaso = doenca.localPrimeiroCaso ? moment(doenca.localPrimeiroCaso) : undefined;
      });
    }
    return res;
  }
}
