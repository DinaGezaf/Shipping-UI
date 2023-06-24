import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './Core/Services/auth.guard';
import { SidebarComponent } from './Shared/sidebar/sidebar.component';
import { LoginComponent } from './components/login/login.component';
import { Roles } from './Core/Models/Roles';
import { DisplayBranchComponent } from './components/Branch/display-branch/display-branch.component';
import { EditBranchComponent } from './components/Branch/edit/edit.component';
import { EditCityComponent } from './components/City/edit/edit.component';
import { DisplayEmployeeComponent } from './components/Employee/display/display.component';
import { DisplayTraderComponent } from './components/Trader/display/display.component';
import { DisplayPrivellageComponent } from './components/Privellge/display/display.component';
import { AddPrivellageComponent } from './components/Privellge/add/add.component';
import { EditPrevillageComponent } from './components/Privellge/edit/edit.component';
import { DisplayGovernmentComponent } from './components/Government/display/display.component';
import { DisplayBranchComponent } from './components/Branch/display-branch/display-branch.component';
import DisplaySalesComponent from './components/Sales Representator/display-sales/display-sales.component';
import { DisplayOrdersStatesComponent } from './components/Order/display-orders-states/display-orders-states.component';
import { DisplayOrdersComponent } from './components/Order/display-orders/display-orders.component';
import { WeightCostPerOrderComponent } from './components/Order/weight-cost-per-order/weight-cost-per-order.component';
import { AddPrivellageComponent } from './components/Privellge/add/add.component';
import { DisplayPrivellageComponent } from './components/Privellge/display/display.component';
import { EditPrevillageComponent } from './components/Privellge/edit/edit.component';
import DisplaySalesComponent from './components/Sales Representator/display-sales/display-sales.component';
import { EditSalesComponent } from './components/Sales Representator/edit-sales/edit-sales.component';
import { OrdersListComponent } from './components/SalesRepresentative/orders-list/orders-list.component';
import { OrdersStatesComponent } from './components/SalesRepresentative/orders-states/orders-states.component';
import { OrderDispalyTraderComponent } from './components/Trader-View/order-display-Trader/order-display-Trader.component';
import { OrdersStatesTraderComponent } from './components/Trader-View/orders-states-trader/orders-states-trader.component';
import { LoginComponent } from './components/login/login.component';
import { DisplayCityComponent } from './components/City/display-city/display-city.component';
import { DisplayTraderComponent } from './components/Trader/display/display.component';

const routes: Routes = [
  { path: '', redirectTo: '/employee', pathMatch: 'full' },
  { path: 'employee', component: DisplayEmployeeComponent },
  { path: 'trader', component: DisplayTraderComponent },
  { path: 'privilege', component: DisplayPrivellageComponent },
  { path: 'privilege/add', component: AddPrivellageComponent },
  { path: 'privilege/edit/:id', component: EditPrevillageComponent },
  { path: 'government', component: DisplayGovernmentComponent },
  { path: 'branch', component: DisplayBranchComponent },
  { path: 'salesRepresentator', component: DisplaySalesComponent },
  { path: 'city', component: DisplayCityComponent },
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'home',
    component: SidebarComponent,
    canActivate: [AuthGuard],
    children: [],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}

