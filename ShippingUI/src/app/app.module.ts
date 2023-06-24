import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DisplayEmployeeComponent } from './components/Employee/display/display.component';
import { DeletePrevillageComponent } from './components/Privellge/delete/delete.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DisplayTraderComponent } from './components/Trader/display/display.component';
import { DisplayPrivellageComponent } from './components/Privellge/display/display.component';
import { DisplayGovernmentComponent } from './components/Government/display/display.component';
import { EditGovernmentComponent } from './components/Government/edit/edit.component';
import { AddPrivellageComponent } from './components/Privellge/add/add.component';
import { EditPrevillageComponent } from './components/Privellge/edit/edit.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DisplayBranchComponent } from './components/Branch/display-branch/display-branch.component';
import DisplaySalesComponent from './components/Sales Representator/display-sales/display-sales.component';
import { EditCityComponent } from './components/City/edit/edit.component';
import { SharedModule } from './Shared/SharedModule/shared.module';
import { SalesRepresentativeModule } from './components/SalesRepresentative/sales-representative.module';
import { DisplayOrdersComponent } from './components/Order/display-orders/display-orders.component';
import { OrderDispalyTraderComponent } from './components/Trader-View/order-display-Trader/order-display-Trader.component';
import { AddOrderComponent } from './components/Trader-View/add-order/add-order.component';
import { EditOrderComponent } from './components/Trader-View/edit-order/edit-order.component';
import { OrdersStatesTraderComponent } from './components/Trader-View/orders-states-trader/orders-states-trader.component';
import { WeightCostPerOrderComponent } from './components/Order/weight-cost-per-order/weight-cost-per-order.component';
import { LoginComponent } from './components/login/login.component';
import { DisplayCityComponent } from './components/City/display-city/display-city.component';

@NgModule({
  declarations: [
    AppComponent,
    DisplayEmployeeComponent,
    DisplayTraderComponent,
    DisplayPrivellageComponent,
    AddPrivellageComponent,
    EditPrevillageComponent,
    DeletePrevillageComponent,
    DisplayGovernmentComponent,
    DisplayBranchComponent,
    DisplaySalesComponent,
    EditGovernmentComponent,
    EditCityComponent,
    DisplayOrdersComponent,
    OrderDispalyTraderComponent,
    AddOrderComponent,
    EditOrderComponent,
    OrdersStatesTraderComponent,
    WeightCostPerOrderComponent,
    LoginComponent,
    DisplayCityComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatSelectModule,
    SharedModule,
    SalesRepresentativeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
