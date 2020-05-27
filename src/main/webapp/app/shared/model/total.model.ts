export interface ITotal {
  currentMonth?: string;
  monthTotal?: number;
}

export class Total implements ITotal {
  constructor(public currentMonth?: string, public monthTotal?: number) {}
}
