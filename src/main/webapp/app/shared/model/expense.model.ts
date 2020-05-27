import { Moment } from 'moment';

export interface IExpense {
  id?: number;
  date?: Moment;
  amount?: number;
  expensename?: string;
  userLogin?: string;
  userId?: number;
}

export class Expense implements IExpense {
  constructor(
    public id?: number,
    public date?: Moment,
    public amount?: number,
    public expensename?: string,
    public userLogin?: string,
    public userId?: number
  ) {}
}
