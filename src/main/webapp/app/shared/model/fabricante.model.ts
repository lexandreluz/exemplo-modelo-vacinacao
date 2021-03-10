import { Moment } from 'moment';
import { IPais } from 'app/shared/model/pais.model';

export interface IFabricante {
  id?: number;
  nome?: string;
  criado?: Moment;
  pais?: IPais;
}

export class Fabricante implements IFabricante {
  constructor(public id?: number, public nome?: string, public criado?: Moment, public pais?: IPais) {}
}
