import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { ExemploVacinacaoTestModule } from '../../../test.module';
import { VacinacaoPessoaUpdateComponent } from 'app/entities/vacinacao-pessoa/vacinacao-pessoa-update.component';
import { VacinacaoPessoaService } from 'app/entities/vacinacao-pessoa/vacinacao-pessoa.service';
import { VacinacaoPessoa } from 'app/shared/model/vacinacao-pessoa.model';

describe('Component Tests', () => {
  describe('VacinacaoPessoa Management Update Component', () => {
    let comp: VacinacaoPessoaUpdateComponent;
    let fixture: ComponentFixture<VacinacaoPessoaUpdateComponent>;
    let service: VacinacaoPessoaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ExemploVacinacaoTestModule],
        declarations: [VacinacaoPessoaUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(VacinacaoPessoaUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(VacinacaoPessoaUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(VacinacaoPessoaService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new VacinacaoPessoa(123);
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
        const entity = new VacinacaoPessoa();
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
