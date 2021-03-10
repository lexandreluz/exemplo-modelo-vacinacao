import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ExemploVacinacaoTestModule } from '../../../test.module';
import { PessoaComponent } from 'app/entities/pessoa/pessoa.component';
import { PessoaService } from 'app/entities/pessoa/pessoa.service';
import { Pessoa } from 'app/shared/model/pessoa.model';

describe('Component Tests', () => {
  describe('Pessoa Management Component', () => {
    let comp: PessoaComponent;
    let fixture: ComponentFixture<PessoaComponent>;
    let service: PessoaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ExemploVacinacaoTestModule],
        declarations: [PessoaComponent],
      })
        .overrideTemplate(PessoaComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PessoaComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PessoaService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Pessoa(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.pessoas && comp.pessoas[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
