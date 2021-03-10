import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { ExemploVacinacaoTestModule } from '../../../test.module';
import { PaisUpdateComponent } from 'app/entities/pais/pais-update.component';
import { PaisService } from 'app/entities/pais/pais.service';
import { Pais } from 'app/shared/model/pais.model';

describe('Component Tests', () => {
  describe('Pais Management Update Component', () => {
    let comp: PaisUpdateComponent;
    let fixture: ComponentFixture<PaisUpdateComponent>;
    let service: PaisService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ExemploVacinacaoTestModule],
        declarations: [PaisUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(PaisUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PaisUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PaisService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Pais(123);
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
        const entity = new Pais();
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
