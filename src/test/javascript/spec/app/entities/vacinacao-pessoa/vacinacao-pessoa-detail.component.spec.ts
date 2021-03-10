import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ExemploVacinacaoTestModule } from '../../../test.module';
import { VacinacaoPessoaDetailComponent } from 'app/entities/vacinacao-pessoa/vacinacao-pessoa-detail.component';
import { VacinacaoPessoa } from 'app/shared/model/vacinacao-pessoa.model';

describe('Component Tests', () => {
  describe('VacinacaoPessoa Management Detail Component', () => {
    let comp: VacinacaoPessoaDetailComponent;
    let fixture: ComponentFixture<VacinacaoPessoaDetailComponent>;
    const route = ({ data: of({ vacinacaoPessoa: new VacinacaoPessoa(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ExemploVacinacaoTestModule],
        declarations: [VacinacaoPessoaDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(VacinacaoPessoaDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(VacinacaoPessoaDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load vacinacaoPessoa on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.vacinacaoPessoa).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
