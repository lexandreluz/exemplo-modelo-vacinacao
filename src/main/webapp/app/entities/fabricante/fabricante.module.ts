import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ExemploVacinacaoSharedModule } from 'app/shared/shared.module';
import { FabricanteComponent } from './fabricante.component';
import { FabricanteDetailComponent } from './fabricante-detail.component';
import { FabricanteUpdateComponent } from './fabricante-update.component';
import { FabricanteDeleteDialogComponent } from './fabricante-delete-dialog.component';
import { fabricanteRoute } from './fabricante.route';

@NgModule({
  imports: [ExemploVacinacaoSharedModule, RouterModule.forChild(fabricanteRoute)],
  declarations: [FabricanteComponent, FabricanteDetailComponent, FabricanteUpdateComponent, FabricanteDeleteDialogComponent],
  entryComponents: [FabricanteDeleteDialogComponent],
})
export class ExemploVacinacaoFabricanteModule {}
