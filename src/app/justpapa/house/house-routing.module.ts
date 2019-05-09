import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HouseDashboardComponent } from './house-dashboard/house-dashboard.component';
import { HouseCrudComponent } from './house-crud/house-crud.component';
import { HouseComponent } from './house.component';
const routes: Routes = [
  //{path: '', component: SchoolComponent},
  {path: '', redirectTo:'house', component: HouseDashboardComponent},
  {path: 'house', component: HouseDashboardComponent},
  {path: 'housecrud/:flagType', component: HouseCrudComponent},
  {path: 'housecrud/:flagType/:houseId', component: HouseCrudComponent},
  {path: '**', redirectTo:'house', component: HouseDashboardComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HouseRoutingModule { }
