import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ExemploVacinacaoSharedModule } from 'app/shared/shared.module';
import { DoencaComponent } from './doenca.component';
import { DoencaDetailComponent } from './doenca-detail.component';
import { DoencaUpdateComponent } from './doenca-update.component';
import { DoencaDeleteDialogComponent } from './doenca-delete-dialog.component';
import { doencaRoute } from './doenca.route';

@NgModule({
  imports: [ExemploVacinacaoSharedModule, RouterModule.forChild(doencaRoute)],
  declarations: [DoencaComponent, DoencaDetailComponent, DoencaUpdateComponent, DoencaDeleteDialogComponent],
  entryComponents: [DoencaDeleteDialogComponent],
})
export class ExemploVacinacaoDoencaModule {}
