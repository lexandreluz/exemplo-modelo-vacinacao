import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_FORMAT, DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { DoencaService } from 'app/entities/doenca/doenca.service';
import { IDoenca, Doenca } from 'app/shared/model/doenca.model';

describe('Service Tests', () => {
  describe('Doenca Service', () => {
    let injector: TestBed;
    let service: DoencaService;
    let httpMock: HttpTestingController;
    let elemDefault: IDoenca;
    let expectedResult: IDoenca | IDoenca[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(DoencaService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Doenca(0, 'AAAAAAA', currentDate, currentDate, currentDate);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            criado: currentDate.format(DATE_TIME_FORMAT),
            dataPrimeiroCaso: currentDate.format(DATE_FORMAT),
            localPrimeiroCaso: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Doenca', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            criado: currentDate.format(DATE_TIME_FORMAT),
            dataPrimeiroCaso: currentDate.format(DATE_FORMAT),
            localPrimeiroCaso: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            criado: currentDate,
            dataPrimeiroCaso: currentDate,
            localPrimeiroCaso: currentDate,
          },
          returnedFromService
        );

        service.create(new Doenca()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Doenca', () => {
        const returnedFromService = Object.assign(
          {
            nome: 'BBBBBB',
            criado: currentDate.format(DATE_TIME_FORMAT),
            dataPrimeiroCaso: currentDate.format(DATE_FORMAT),
            localPrimeiroCaso: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            criado: currentDate,
            dataPrimeiroCaso: currentDate,
            localPrimeiroCaso: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Doenca', () => {
        const returnedFromService = Object.assign(
          {
            nome: 'BBBBBB',
            criado: currentDate.format(DATE_TIME_FORMAT),
            dataPrimeiroCaso: currentDate.format(DATE_FORMAT),
            localPrimeiroCaso: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            criado: currentDate,
            dataPrimeiroCaso: currentDate,
            localPrimeiroCaso: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Doenca', () => {
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
