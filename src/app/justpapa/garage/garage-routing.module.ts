import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GarageComponent } from './garage.component';
import { VehicleCrudComponent } from './vehicle-crud/vehicle-crud.component';
const routes: Routes = [
  //{path: '', component: SchoolComponent},
  {path: '', redirectTo:'garage', component: GarageComponent},
  {path: 'garage', component: GarageComponent},
  {path: 'vehiclecrud/:flagType', component: VehicleCrudComponent},
  {path: 'vehiclecrud/:flagType/:vehicleId', component: VehicleCrudComponent},
  {path: '**', redirectTo:'garage', component: GarageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GarageRoutingModule { }
