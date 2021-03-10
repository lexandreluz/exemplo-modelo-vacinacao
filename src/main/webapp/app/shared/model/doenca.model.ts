import { Moment } from 'moment';

export interface IDoenca {
  id?: number;
  nome?: string;
  criado?: Moment;
  dataPrimeiroCaso?: Moment;
  localPrimeiroCaso?: Moment;
}

export class Doenca implements IDoenca {
  constructor(
    public id?: number,
    public nome?: string,
    public criado?: Moment,
    public dataPrimeiroCaso?: Moment,
    public localPrimeiroCaso?: Moment
  ) {}
}
