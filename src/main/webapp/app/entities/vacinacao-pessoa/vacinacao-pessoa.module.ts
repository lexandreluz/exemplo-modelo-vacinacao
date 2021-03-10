import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ExemploVacinacaoSharedModule } from 'app/shared/shared.module';
import { VacinacaoPessoaComponent } from './vacinacao-pessoa.component';
import { VacinacaoPessoaDetailComponent } from './vacinacao-pessoa-detail.component';
import { VacinacaoPessoaUpdateComponent } from './vacinacao-pessoa-update.component';
import { VacinacaoPessoaDeleteDialogComponent } from './vacinacao-pessoa-delete-dialog.component';
import { vacinacaoPessoaRoute } from './vacinacao-pessoa.route';

@NgModule({
  imports: [ExemploVacinacaoSharedModule, RouterModule.forChild(vacinacaoPessoaRoute)],
  declarations: [
    VacinacaoPessoaComponent,
    VacinacaoPessoaDetailComponent,
    VacinacaoPessoaUpdateComponent,
    VacinacaoPessoaDeleteDialogComponent,
  ],
  entryComponents: [VacinacaoPessoaDeleteDialogComponent],
})
export class ExemploVacinacaoVacinacaoPessoaModule {}
