import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GarageComponent } from './garage.component';
import { VehicleCrudComponent } from './vehicle-crud/vehicle-crud.component';
import { TransactionComponent } from './transaction/transaction.component';
import { TransactionCrudComponent } from './transaction-crud/transaction-crud.component';
const routes: Routes = [
  //{path: '', component: SchoolComponent},
  {path: '', redirectTo:'garage', component: GarageComponent},
  {path: 'garage', component: GarageComponent},
  {path: 'vehiclecrud/:flagType', component: VehicleCrudComponent},
  {path: 'vehiclecrud/:flagType/:vehicleId', component: VehicleCrudComponent},
  {path: 'transactions/:vehicleId', component: TransactionComponent},
  {path: 'transactioncrud/:flagType/:vehicleId', component: TransactionCrudComponent},
  {path: 'transactioncrud/:flagType/:id/:vehicleId', component: TransactionCrudComponent},
  {path: '**', redirectTo:'garage', component: GarageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GarageRoutingModule { }
