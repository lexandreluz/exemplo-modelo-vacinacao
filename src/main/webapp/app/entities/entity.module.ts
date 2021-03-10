import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'vacina',
        loadChildren: () => import('./vacina/vacina.module').then(m => m.ExemploVacinacaoVacinaModule),
      },
      {
        path: 'pais',
        loadChildren: () => import('./pais/pais.module').then(m => m.ExemploVacinacaoPaisModule),
      },
      {
        path: 'fabricante',
        loadChildren: () => import('./fabricante/fabricante.module').then(m => m.ExemploVacinacaoFabricanteModule),
      },
      {
        path: 'doenca',
        loadChildren: () => import('./doenca/doenca.module').then(m => m.ExemploVacinacaoDoencaModule),
      },
      {
        path: 'vacinacao-pessoa',
        loadChildren: () => import('./vacinacao-pessoa/vacinacao-pessoa.module').then(m => m.ExemploVacinacaoVacinacaoPessoaModule),
      },
      {
        path: 'pessoa',
        loadChildren: () => import('./pessoa/pessoa.module').then(m => m.ExemploVacinacaoPessoaModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class ExemploVacinacaoEntityModule {}
