import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IExpense } from 'app/shared/model/expense.model';

@Component({
  selector: 'jhi-expense-detail',
  templateUrl: './expense-detail.component.html'
})
export class ExpenseDetailComponent implements OnInit {
  expense: IExpense;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ expense }) => {
      this.expense = expense;
    });
  }

  previousState() {
    window.history.back();
  }
}
