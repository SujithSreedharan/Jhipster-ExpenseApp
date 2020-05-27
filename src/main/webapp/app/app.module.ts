import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { ExpensesSharedModule } from 'app/shared/shared.module';
import { ExpensesCoreModule } from 'app/core/core.module';
import { ExpensesAppRoutingModule } from './app-routing.module';
import { ExpensesHomeModule } from './home/home.module';
import { ExpensesEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { JhiMainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    ExpensesSharedModule,
    ExpensesCoreModule,
    ExpensesHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    ExpensesEntityModule,
    ExpensesAppRoutingModule
  ],
  declarations: [JhiMainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
  bootstrap: [JhiMainComponent]
})
export class ExpensesAppModule {}
