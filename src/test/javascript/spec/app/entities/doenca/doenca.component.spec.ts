import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ExemploVacinacaoTestModule } from '../../../test.module';
import { DoencaComponent } from 'app/entities/doenca/doenca.component';
import { DoencaService } from 'app/entities/doenca/doenca.service';
import { Doenca } from 'app/shared/model/doenca.model';

describe('Component Tests', () => {
  describe('Doenca Management Component', () => {
    let comp: DoencaComponent;
    let fixture: ComponentFixture<DoencaComponent>;
    let service: DoencaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ExemploVacinacaoTestModule],
        declarations: [DoencaComponent],
      })
        .overrideTemplate(DoencaComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DoencaComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DoencaService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Doenca(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.doencas && comp.doencas[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
