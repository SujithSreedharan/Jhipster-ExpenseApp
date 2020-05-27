import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ITotal } from 'app/shared/model/total.model';

type EntityResponseType = HttpResponse<ITotal>;

@Injectable({ providedIn: 'root' })
export class HomeService {
  public resourceUrl = SERVER_API_URL + 'api/total';

  constructor(protected http: HttpClient) {}

  find(): Observable<EntityResponseType> {
    return this.http.get<ITotal>(`${this.resourceUrl}`, { observe: 'response' });
  }
}
