import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GarageRoutingModule } from '../garage/garage-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GarageComponent } from './garage.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GarageService } from './_service/garage.service';
import { AppSharedModule } from '../../app-shared/app-shared.module';
import { SharedModule } from '../shared/shared.module';
import { VehicleCrudComponent } from './vehicle-crud/vehicle-crud.component';
@NgModule({
  imports: [
    CommonModule,
    GarageRoutingModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    AppSharedModule,
    SharedModule
  ],
  declarations: [
    GarageComponent,
    VehicleCrudComponent
  ],
  providers: [
    GarageService
  ]
})
export class GarageModule { }
