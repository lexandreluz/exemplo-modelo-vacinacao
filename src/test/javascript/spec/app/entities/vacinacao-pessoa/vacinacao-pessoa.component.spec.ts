import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ExemploVacinacaoTestModule } from '../../../test.module';
import { VacinacaoPessoaComponent } from 'app/entities/vacinacao-pessoa/vacinacao-pessoa.component';
import { VacinacaoPessoaService } from 'app/entities/vacinacao-pessoa/vacinacao-pessoa.service';
import { VacinacaoPessoa } from 'app/shared/model/vacinacao-pessoa.model';

describe('Component Tests', () => {
  describe('VacinacaoPessoa Management Component', () => {
    let comp: VacinacaoPessoaComponent;
    let fixture: ComponentFixture<VacinacaoPessoaComponent>;
    let service: VacinacaoPessoaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ExemploVacinacaoTestModule],
        declarations: [VacinacaoPessoaComponent],
      })
        .overrideTemplate(VacinacaoPessoaComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(VacinacaoPessoaComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(VacinacaoPessoaService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new VacinacaoPessoa(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.vacinacaoPessoas && comp.vacinacaoPessoas[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
