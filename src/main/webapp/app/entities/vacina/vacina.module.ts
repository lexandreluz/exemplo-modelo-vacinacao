import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ExemploVacinacaoSharedModule } from 'app/shared/shared.module';
import { VacinaComponent } from './vacina.component';
import { VacinaDetailComponent } from './vacina-detail.component';
import { VacinaUpdateComponent } from './vacina-update.component';
import { VacinaDeleteDialogComponent } from './vacina-delete-dialog.component';
import { vacinaRoute } from './vacina.route';

@NgModule({
  imports: [ExemploVacinacaoSharedModule, RouterModule.forChild(vacinaRoute)],
  declarations: [VacinaComponent, VacinaDetailComponent, VacinaUpdateComponent, VacinaDeleteDialogComponent],
  entryComponents: [VacinaDeleteDialogComponent],
})
export class ExemploVacinacaoVacinaModule {}
