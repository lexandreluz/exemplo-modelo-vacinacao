import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IVacinacaoPessoa } from 'app/shared/model/vacinacao-pessoa.model';

type EntityResponseType = HttpResponse<IVacinacaoPessoa>;
type EntityArrayResponseType = HttpResponse<IVacinacaoPessoa[]>;

@Injectable({ providedIn: 'root' })
export class VacinacaoPessoaService {
  public resourceUrl = SERVER_API_URL + 'api/vacinacao-pessoas';

  constructor(protected http: HttpClient) {}

  create(vacinacaoPessoa: IVacinacaoPessoa): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(vacinacaoPessoa);
    return this.http
      .post<IVacinacaoPessoa>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(vacinacaoPessoa: IVacinacaoPessoa): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(vacinacaoPessoa);
    return this.http
      .put<IVacinacaoPessoa>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IVacinacaoPessoa>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IVacinacaoPessoa[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(vacinacaoPessoa: IVacinacaoPessoa): IVacinacaoPessoa {
    const copy: IVacinacaoPessoa = Object.assign({}, vacinacaoPessoa, {
      quando: vacinacaoPessoa.quando && vacinacaoPessoa.quando.isValid() ? vacinacaoPessoa.quando.format(DATE_FORMAT) : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.quando = res.body.quando ? moment(res.body.quando) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((vacinacaoPessoa: IVacinacaoPessoa) => {
        vacinacaoPessoa.quando = vacinacaoPessoa.quando ? moment(vacinacaoPessoa.quando) : undefined;
      });
    }
    return res;
  }
}
