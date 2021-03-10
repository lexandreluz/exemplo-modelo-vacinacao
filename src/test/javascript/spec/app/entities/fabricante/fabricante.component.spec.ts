import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ExemploVacinacaoTestModule } from '../../../test.module';
import { FabricanteComponent } from 'app/entities/fabricante/fabricante.component';
import { FabricanteService } from 'app/entities/fabricante/fabricante.service';
import { Fabricante } from 'app/shared/model/fabricante.model';

describe('Component Tests', () => {
  describe('Fabricante Management Component', () => {
    let comp: FabricanteComponent;
    let fixture: ComponentFixture<FabricanteComponent>;
    let service: FabricanteService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ExemploVacinacaoTestModule],
        declarations: [FabricanteComponent],
      })
        .overrideTemplate(FabricanteComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FabricanteComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FabricanteService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Fabricante(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.fabricantes && comp.fabricantes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
