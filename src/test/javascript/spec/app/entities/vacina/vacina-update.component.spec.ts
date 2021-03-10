import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { ExemploVacinacaoTestModule } from '../../../test.module';
import { VacinaUpdateComponent } from 'app/entities/vacina/vacina-update.component';
import { VacinaService } from 'app/entities/vacina/vacina.service';
import { Vacina } from 'app/shared/model/vacina.model';

describe('Component Tests', () => {
  describe('Vacina Management Update Component', () => {
    let comp: VacinaUpdateComponent;
    let fixture: ComponentFixture<VacinaUpdateComponent>;
    let service: VacinaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ExemploVacinacaoTestModule],
        declarations: [VacinaUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(VacinaUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(VacinaUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(VacinaService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Vacina(123);
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
        const entity = new Vacina();
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
