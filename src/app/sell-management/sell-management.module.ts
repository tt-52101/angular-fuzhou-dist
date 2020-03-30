import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellManagementRoutingModule } from './sell-management-routing.module';

import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '@shared/shared.module';

import { AbpModule } from '@abp/abp.module';



import { SellTicketsComponent } from './selltickets/selltickets.component';
import { CreateOrEditPassengerComponent } from './selltickets/create-or-edit-passenger/create-or-edit-passenger.component';

import { InternetTicketComponent } from './internetticket/internetticket.component';

import { RefundTicketComponent } from './refundticket/refundticket.component';

import { ControlTicketComponent } from './controlticket/controlticket.component';
import { EditControlComponent } from './controlticket/edit-control/edit-control.component';

import { CustomerComponent } from './customer/customer.component';
import { CreateOrEditCustomerComponent } from './customer/create-or-edit-customer/create-or-edit-customer.component';

import { TimeFormat } from '../common/timeformat.pipe';
@NgModule({
  imports: [
  CommonModule,
  HttpClientModule,
  SellManagementRoutingModule,
  SharedModule,
  AbpModule,
  ],
  declarations: [
  TimeFormat,

  SellTicketsComponent,
  CreateOrEditPassengerComponent,
  EditControlComponent,
  InternetTicketComponent,
  RefundTicketComponent,
  ControlTicketComponent,
  CustomerComponent,
  CreateOrEditCustomerComponent
  ],
  entryComponents: [
  CreateOrEditPassengerComponent,
  EditControlComponent,
  CreateOrEditCustomerComponent,
  ],
  providers: []
})
export class SellManagementModule {}
