export interface IPais {
  id?: number;
  nome?: string;
  sigla?: string;
}

export class Pais implements IPais {
  constructor(public id?: number, public nome?: string, public sigla?: string) {}
}
