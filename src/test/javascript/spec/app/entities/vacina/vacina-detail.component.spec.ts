import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ExemploVacinacaoTestModule } from '../../../test.module';
import { VacinaDetailComponent } from 'app/entities/vacina/vacina-detail.component';
import { Vacina } from 'app/shared/model/vacina.model';

describe('Component Tests', () => {
  describe('Vacina Management Detail Component', () => {
    let comp: VacinaDetailComponent;
    let fixture: ComponentFixture<VacinaDetailComponent>;
    const route = ({ data: of({ vacina: new Vacina(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ExemploVacinacaoTestModule],
        declarations: [VacinaDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(VacinaDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(VacinaDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load vacina on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.vacina).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
