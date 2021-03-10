import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ExemploVacinacaoSharedModule } from 'app/shared/shared.module';

import { DocsComponent } from './docs.component';

import { docsRoute } from './docs.route';

@NgModule({
  imports: [ExemploVacinacaoSharedModule, RouterModule.forChild([docsRoute])],
  declarations: [DocsComponent],
})
export class DocsModule {}
