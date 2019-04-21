import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChitfundRoutingModule } from '../chitfund/chitfund-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChitfundComponent } from './chitfund.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppSharedModule } from '../../app-shared/app-shared.module';
import { ChitfundGroupComponent } from './_component/chitfund-group/chitfund-group.component';
import { ChitfundService } from './_service/chitfund.service';
import { ChitfundCrudComponent } from './chitfund-crud/chitfund-crud.component';
import { ChitfundPassbookComponent } from './chitfund-passbook/chitfund-passbook.component';
import { CfPassbookComponent } from './_component/cf-passbook/cf-passbook.component';
import { ChitfundPassbookCrudComponent } from './chitfund-passbook-crud/chitfund-passbook-crud.component';

@NgModule({
  imports: [
    CommonModule,
    ChitfundRoutingModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    AppSharedModule
  ],
  declarations: [
    ChitfundComponent,
    ChitfundGroupComponent,
    ChitfundCrudComponent,
    ChitfundPassbookComponent,
    CfPassbookComponent,
    ChitfundPassbookCrudComponent
  ],
  providers: [
    ChitfundService
  ]
})
export class ChitfundModule { }
