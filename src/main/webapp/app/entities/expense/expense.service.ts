import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IExpense } from 'app/shared/model/expense.model';

type EntityResponseType = HttpResponse<IExpense>;
type EntityArrayResponseType = HttpResponse<IExpense[]>;

@Injectable({ providedIn: 'root' })
export class ExpenseService {
  public resourceUrl = SERVER_API_URL + 'api/expenses';

  constructor(protected http: HttpClient) {}

  create(expense: IExpense): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(expense);
    return this.http
      .post<IExpense>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(expense: IExpense): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(expense);
    return this.http
      .put<IExpense>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IExpense>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IExpense[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(expense: IExpense): IExpense {
    const copy: IExpense = Object.assign({}, expense, {
      date: expense.date != null && expense.date.isValid() ? expense.date.format(DATE_FORMAT) : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.date = res.body.date != null ? moment(res.body.date) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((expense: IExpense) => {
        expense.date = expense.date != null ? moment(expense.date) : null;
      });
    }
    return res;
  }
}
