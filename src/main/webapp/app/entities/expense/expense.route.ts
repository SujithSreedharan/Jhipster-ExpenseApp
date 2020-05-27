import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Expense } from 'app/shared/model/expense.model';
import { ExpenseService } from './expense.service';
import { ExpenseComponent } from './expense.component';
import { ExpenseDetailComponent } from './expense-detail.component';
import { ExpenseUpdateComponent } from './expense-update.component';
import { IExpense } from 'app/shared/model/expense.model';

@Injectable({ providedIn: 'root' })
export class ExpenseResolve implements Resolve<IExpense> {
  constructor(private service: ExpenseService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IExpense> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((expense: HttpResponse<Expense>) => expense.body));
    }
    return of(new Expense());
  }
}

export const expenseRoute: Routes = [
  {
    path: '',
    component: ExpenseComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Expenses'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ExpenseDetailComponent,
    resolve: {
      expense: ExpenseResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Expenses'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ExpenseUpdateComponent,
    resolve: {
      expense: ExpenseResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Expenses'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ExpenseUpdateComponent,
    resolve: {
      expense: ExpenseResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Expenses'
    },
    canActivate: [UserRouteAccessService]
  }
];
