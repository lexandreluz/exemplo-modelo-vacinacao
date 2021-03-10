import { Moment } from 'moment';

export interface IPessoa {
  id?: number;
  nome?: string;
  dataNascimento?: Moment;
}

export class Pessoa implements IPessoa {
  constructor(public id?: number, public nome?: string, public dataNascimento?: Moment) {}
}
