import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PiggyBankComponent } from './piggy-bank.component';
import { PiggyBankCrudComponent } from './piggy-bank-crud/piggy-bank-crud.component';

const routes: Routes = [
  //{path: '', component: SchoolComponent},
  {path: '', redirectTo:'piggybank', component: PiggyBankComponent},
  {path: 'piggybank', component: PiggyBankComponent},
  {path: 'piggybankcrud/:flagType', component: PiggyBankCrudComponent},
  {path: 'piggybankcrud/:flagType/:pbId', component: PiggyBankCrudComponent},
  {path: '**', redirectTo:'piggybank', component: PiggyBankComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PiggyBankRoutingModule { }
