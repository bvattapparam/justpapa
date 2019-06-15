import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HouseRoutingModule } from '../house/house-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HouseDashboardComponent } from './house-dashboard/house-dashboard.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HouseService } from './_service/house.service';
import { AppSharedModule } from '../../app-shared/app-shared.module';
import { SharedModule } from '../shared/shared.module';
import { HouseCrudComponent } from './house-crud/house-crud.component';
import { HouseComponent } from './house.component';
import { HouseBasicDetailsComponent } from './_component/house-basic-details.component';
import { HousePurchaseDetailsComponent } from './_component/house-purchase-details.component';
import { HousePurchaseCrudComponent } from './house-purchase-crud/house-purchase-crud.component';
import { HousePptComponent } from './house-ppt/house-ppt.component';
import { HousePptCrudComponent } from './house-ppt-crud/house-ppt-crud.component';
@NgModule({
  imports: [
    CommonModule,
    HouseRoutingModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    AppSharedModule,
    SharedModule
  ],
  declarations: [
    HouseDashboardComponent,
    HouseCrudComponent,
    HouseComponent,
    HouseBasicDetailsComponent,
    HousePurchaseDetailsComponent,
    HousePurchaseCrudComponent,
    HousePptComponent,
    HousePptCrudComponent
  ],
  providers: [
    HouseService
  ]
})
export class HouseModule { }
