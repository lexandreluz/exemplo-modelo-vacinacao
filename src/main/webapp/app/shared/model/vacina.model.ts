import { Moment } from 'moment';
import { IDoenca } from 'app/shared/model/doenca.model';

export interface IVacina {
  id?: number;
  nome?: string;
  criada?: Moment;
  doenca?: IDoenca;
}

export class Vacina implements IVacina {
  constructor(public id?: number, public nome?: string, public criada?: Moment, public doenca?: IDoenca) {}
}
