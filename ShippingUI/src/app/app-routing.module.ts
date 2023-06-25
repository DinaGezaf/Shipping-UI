import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './Core/Services/auth.guard';
import { SidebarComponent } from './Shared/sidebar/sidebar.component';
import { LoginComponent } from './components/login/login.component';
import { Roles } from './Core/Models/Roles';
import { DisplayEmployeeComponent } from './components/Employee/display/display.component';
import { DisplayGovernmentComponent } from './components/Government/display/display.component';
import { DisplayBranchComponent } from './components/Branch/display-branch/display-branch.component';
import { DisplayOrdersStatesComponent } from './components/Order/display-orders-states/display-orders-states.component';
import { DisplayOrdersComponent } from './components/Order/display-orders/display-orders.component';
import { WeightCostPerOrderComponent } from './components/Order/weight-cost-per-order/weight-cost-per-order.component';
import { AddPrivellageComponent } from './components/Privellge/add/add.component';
import { DisplayPrivellageComponent } from './components/Privellge/display/display.component';
import { EditPrevillageComponent } from './components/Privellge/edit/edit.component';
import DisplaySalesComponent from './components/Sales Representator/display-sales/display-sales.component';
import { OrdersListComponent } from './components/SalesRepresentative/orders-list/orders-list.component';
import { OrdersStatesComponent } from './components/SalesRepresentative/orders-states/orders-states.component';
import { OrderDispalyTraderComponent } from './components/Trader-View/order-display-Trader/order-display-Trader.component';
import { OrdersStatesTraderComponent } from './components/Trader-View/orders-states-trader/orders-states-trader.component';
import { DisplayCityComponent } from './components/City/display-city/display-city.component';
import { DisplayTraderComponent } from './components/Trader/display/display.component';

const routes: Routes = [
  { path: '', component: DisplayEmployeeComponent },
  // { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'home',
    component: SidebarComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'branch', component: DisplayBranchComponent },
      { path: 'city', component: DisplayCityComponent },
      { path: 'trader', component: DisplayTraderComponent },
      { path: 'employee', component: DisplayEmployeeComponent },
      { path: 'sales', component: DisplaySalesComponent },
      {
        path: 'order/states/employee',
        component: DisplayOrdersStatesComponent,
      },
      { path: 'order/list/employee', component: DisplayOrdersComponent },
      { path: 'order/weightoption', component: WeightCostPerOrderComponent },
      { path: 'privilege', component: DisplayPrivellageComponent },
      { path: 'privilege/add', component: AddPrivellageComponent },
      { path: 'privilege/edit/:id', component: EditPrevillageComponent },
      { path: 'government', component: DisplayGovernmentComponent },

      { path: 'order/list/trader', component: OrderDispalyTraderComponent },
      { path: 'order/states/trader', component: OrdersStatesTraderComponent },

      { path: 'order/list/sales', component: OrdersListComponent },
      { path: 'order/states/sales', component: OrdersStatesComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
