import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { VacinacaoPessoaService } from 'app/entities/vacinacao-pessoa/vacinacao-pessoa.service';
import { IVacinacaoPessoa, VacinacaoPessoa } from 'app/shared/model/vacinacao-pessoa.model';

describe('Service Tests', () => {
  describe('VacinacaoPessoa Service', () => {
    let injector: TestBed;
    let service: VacinacaoPessoaService;
    let httpMock: HttpTestingController;
    let elemDefault: IVacinacaoPessoa;
    let expectedResult: IVacinacaoPessoa | IVacinacaoPessoa[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(VacinacaoPessoaService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new VacinacaoPessoa(0, currentDate, 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            quando: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a VacinacaoPessoa', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            quando: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            quando: currentDate,
          },
          returnedFromService
        );

        service.create(new VacinacaoPessoa()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a VacinacaoPessoa', () => {
        const returnedFromService = Object.assign(
          {
            quando: currentDate.format(DATE_FORMAT),
            cns: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            quando: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of VacinacaoPessoa', () => {
        const returnedFromService = Object.assign(
          {
            quando: currentDate.format(DATE_FORMAT),
            cns: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            quando: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a VacinacaoPessoa', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
