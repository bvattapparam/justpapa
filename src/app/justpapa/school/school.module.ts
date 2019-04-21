import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolRoutingModule } from '../school/school-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SchoolComponent } from './school.component';
import { SchoolCrudComponent } from './school-crud/school-crud.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FeesTransactionComponent } from './_component/fees-transaction/fees-transaction.component';
import { SchoolService } from './_service/school.service';
import { AppSharedModule } from '../../app-shared/app-shared.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SchoolRoutingModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    AppSharedModule,
    SharedModule
    
  ],
  declarations: [
    SchoolComponent, 
    SchoolCrudComponent, 
    FeesTransactionComponent
  ],
  providers: [
    SchoolService
  ]
})
export class SchoolModule { }
