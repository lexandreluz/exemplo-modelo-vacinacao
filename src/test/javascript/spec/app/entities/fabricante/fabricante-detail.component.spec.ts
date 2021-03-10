import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ExemploVacinacaoTestModule } from '../../../test.module';
import { FabricanteDetailComponent } from 'app/entities/fabricante/fabricante-detail.component';
import { Fabricante } from 'app/shared/model/fabricante.model';

describe('Component Tests', () => {
  describe('Fabricante Management Detail Component', () => {
    let comp: FabricanteDetailComponent;
    let fixture: ComponentFixture<FabricanteDetailComponent>;
    const route = ({ data: of({ fabricante: new Fabricante(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ExemploVacinacaoTestModule],
        declarations: [FabricanteDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(FabricanteDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(FabricanteDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load fabricante on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.fabricante).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
