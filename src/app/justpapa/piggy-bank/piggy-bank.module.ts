import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PiggyBankRoutingModule } from '../piggy-bank/piggy-bank-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PiggyBankComponent } from './piggy-bank.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PiggyBankService } from './_serivce/piggy-bank.service';
import { AppSharedModule } from '../../app-shared/app-shared.module';
import { SharedModule } from '../shared/shared.module';
import { PiggyBankCrudComponent } from './piggy-bank-crud/piggy-bank-crud.component';

@NgModule({
  imports: [
    CommonModule,
    PiggyBankRoutingModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    AppSharedModule,
    SharedModule
  ],
  declarations: [
    PiggyBankComponent,
    PiggyBankCrudComponent
  ],
  providers:[
    PiggyBankService
  ]
})
export class PiggyBankModule { }
