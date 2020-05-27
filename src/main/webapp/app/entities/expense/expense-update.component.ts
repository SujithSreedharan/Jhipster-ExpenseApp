import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { IExpense, Expense } from 'app/shared/model/expense.model';
import { ExpenseService } from './expense.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';

@Component({
  selector: 'jhi-expense-update',
  templateUrl: './expense-update.component.html'
})
export class ExpenseUpdateComponent implements OnInit {
  isSaving: boolean;

  users: IUser[];
  dateDp: any;

  editForm = this.fb.group({
    id: [],
    date: [],
    amount: [],
    expensename: [],
    userId: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected expenseService: ExpenseService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ expense }) => {
      this.updateForm(expense);
    });
    this.userService
      .query()
      .subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(expense: IExpense) {
    this.editForm.patchValue({
      id: expense.id,
      date: expense.date,
      amount: expense.amount,
      expensename: expense.expensename,
      userId: expense.userId
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const expense = this.createFromForm();
    if (expense.id !== undefined) {
      this.subscribeToSaveResponse(this.expenseService.update(expense));
    } else {
      this.subscribeToSaveResponse(this.expenseService.create(expense));
    }
  }

  private createFromForm(): IExpense {
    return {
      ...new Expense(),
      id: this.editForm.get(['id']).value,
      date: this.editForm.get(['date']).value,
      amount: this.editForm.get(['amount']).value,
      expensename: this.editForm.get(['expensename']).value,
      userId: this.editForm.get(['userId']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IExpense>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackUserById(index: number, item: IUser) {
    return item.id;
  }
}
