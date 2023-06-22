import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DisplayEmployeeComponent } from './components/Employee/display/display.component';
import { AddEmployeeComponent } from './components/Employee/add/add.component';
import { EditEmployeeComponent } from './components/Employee/edit/edit.component';
import { DisplayTraderComponent } from './components/Trader/display/display.component';
import { AddTraderComponent } from './components/Trader/add/add.component';
import { DisplayPrivellageComponent } from './components/Privellge/display/display.component';
import { AddPrivellageComponent } from './components/Privellge/add/add.component';
import { EditPrevillageComponent } from './components/Privellge/edit/edit.component';
import { DisplayGovernmentComponent } from './components/Government/display/display.component';
import { DisplayBranchComponent } from './components/Branch/display-branch/display-branch.component';
import { AddBranchComponent } from './components/Branch/add/add.component';
import { EditBranchComponent } from './components/Branch/edit/edit.component';
import DisplaySalesComponent from './components/Sales Representator/display-sales/display-sales.component';
import { AddSalesComponent } from './components/Sales Representator/add/add.component';
import { EditSalesComponent } from './components/Sales Representator/edit-sales/edit-sales.component';
import { EditTraderComponent } from './components/Trader/edit/edit.component';
import { AddCityComponent } from './components/City/add/add.component';
import { EditGovernmentComponent } from './components/Government/edit/edit.component';
import { EditCityComponent } from './components/City/edit/edit.component';

const routes: Routes = [
  { path: '', redirectTo: '/employee', pathMatch: 'full' },
  { path: 'employee', component: DisplayEmployeeComponent },
  { path: 'employee/add', component: AddEmployeeComponent },
  { path: 'employee/edit/:id', component: EditEmployeeComponent },
  { path: 'trader', component: DisplayTraderComponent },
  { path: 'trader/add', component: AddTraderComponent },
  { path: 'trader/edit/:id', component: EditTraderComponent },
  { path: 'privilege', component: DisplayPrivellageComponent },
  { path: 'privilege/add', component: AddPrivellageComponent },
  { path: 'privilege/edit/:id', component: EditPrevillageComponent },
  { path: 'government', component: DisplayGovernmentComponent },
  { path: 'branch', component: DisplayBranchComponent },
  { path: 'branch/add', component: AddBranchComponent },
  { path: 'branch/edit/:id', component: EditBranchComponent },
  { path: 'salesRepresentator', component: DisplaySalesComponent },
  { path: 'salesRepresentator/add', component: AddSalesComponent },
  { path: 'salesRepresentator/edit/:id', component: EditSalesComponent },
  { path: 'city', component: AddCityComponent },
  { path: 'government/update/:id', component: EditGovernmentComponent },
  { path: 'city/edit/:id', component: EditCityComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
