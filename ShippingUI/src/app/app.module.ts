import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditEmployeeComponent } from './components/Employee/edit/edit.component';
import { DisplayEmployeeComponent } from './components/Employee/display/display.component';
import { DeletePrevillageComponent } from './components/Privellge/delete/delete.component';
import { SidemenuComponent } from './components/sidemenu/sidemenu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DisplayTraderComponent } from './components/Trader/display/display.component';
import { EditTraderComponent } from './components/Trader/edit/edit.component';
import { DisplayPrivellageComponent } from './components/Privellge/display/display.component';
import { DisplayGovernmentComponent } from './components/Government/display/display.component';
import { EditGovernmentComponent } from './components/Government/edit/edit.component';
import { AddPrivellageComponent } from './components/Privellge/add/add.component';
import { EditPrevillageComponent } from './components/Privellge/edit/edit.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DisplayBranchComponent } from './components/Branch/display-branch/display-branch.component';
import { EditBranchComponent } from './components/Branch/edit/edit.component';
import DisplaySalesComponent from './components/Sales Representator/display-sales/display-sales.component';
import { EditSalesComponent } from './components/Sales Representator/edit-sales/edit-sales.component';
import { EditCityComponent } from './components/City/edit/edit.component';

@NgModule({
  declarations: [
    AppComponent,
    EditEmployeeComponent,
    DisplayEmployeeComponent,
    SidemenuComponent,
    DisplayTraderComponent,
    EditTraderComponent,
    DisplayPrivellageComponent,
    AddPrivellageComponent,
    EditPrevillageComponent,
    DeletePrevillageComponent,
    DisplayGovernmentComponent,
    DisplayBranchComponent,
    EditBranchComponent,
    DisplaySalesComponent,
    EditSalesComponent,
    EditGovernmentComponent,
    EditCityComponent,
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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
