import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { ExemploVacinacaoTestModule } from '../../../test.module';
import { FabricanteUpdateComponent } from 'app/entities/fabricante/fabricante-update.component';
import { FabricanteService } from 'app/entities/fabricante/fabricante.service';
import { Fabricante } from 'app/shared/model/fabricante.model';

describe('Component Tests', () => {
  describe('Fabricante Management Update Component', () => {
    let comp: FabricanteUpdateComponent;
    let fixture: ComponentFixture<FabricanteUpdateComponent>;
    let service: FabricanteService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ExemploVacinacaoTestModule],
        declarations: [FabricanteUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(FabricanteUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FabricanteUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FabricanteService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Fabricante(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Fabricante();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
