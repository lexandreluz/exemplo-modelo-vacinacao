import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ExemploVacinacaoTestModule } from '../../../test.module';
import { VacinaComponent } from 'app/entities/vacina/vacina.component';
import { VacinaService } from 'app/entities/vacina/vacina.service';
import { Vacina } from 'app/shared/model/vacina.model';

describe('Component Tests', () => {
  describe('Vacina Management Component', () => {
    let comp: VacinaComponent;
    let fixture: ComponentFixture<VacinaComponent>;
    let service: VacinaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ExemploVacinacaoTestModule],
        declarations: [VacinaComponent],
      })
        .overrideTemplate(VacinaComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(VacinaComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(VacinaService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Vacina(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.vacinas && comp.vacinas[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
