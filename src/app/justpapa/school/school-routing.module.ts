import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SchoolComponent } from './school.component';
import { SchoolCrudComponent } from './school-crud/school-crud.component';

const routes: Routes = [
  //{path: '', component: SchoolComponent},
  {path: '', redirectTo:'school', component: SchoolComponent},
  {path: 'school', component: SchoolComponent},
  {path: 'schoolcrud/:flagType/:feesId', component: SchoolCrudComponent},
  {path: 'schoolcrud/:flagType', component: SchoolCrudComponent},
  {path: '**', redirectTo:'school', component: SchoolComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchoolRoutingModule { }
