import { Moment } from 'moment';
import { IPessoa } from 'app/shared/model/pessoa.model';
import { IVacina } from 'app/shared/model/vacina.model';
import { IFabricante } from 'app/shared/model/fabricante.model';

export interface IVacinacaoPessoa {
  id?: number;
  quando?: Moment;
  cns?: string;
  pessoa?: IPessoa;
  vacina?: IVacina;
  vacina?: IFabricante;
}

export class VacinacaoPessoa implements IVacinacaoPessoa {
  constructor(
    public id?: number,
    public quando?: Moment,
    public cns?: string,
    public pessoa?: IPessoa,
    public vacina?: IVacina,
    public vacina?: IFabricante
  ) {}
}
