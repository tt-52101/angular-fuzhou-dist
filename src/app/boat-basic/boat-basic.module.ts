import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';

import { BoatBasicRoutingModule } from './boat-basic-routing.module';

import { BoatComponent } from './boat.component';
import { RouteComponent } from './route.component';
import { ScheduleComponent } from './schedule.component';
import { WharfComponent } from './wharf.component';

// import { ScheduleAuditComponent } from './schedule-audit.component';


import { CreateOrEditBoatComponent } from './create-or-edit-boat/create-or-edit-boat.component';
import { CreateOrEditRouteComponent } from './create-or-edit-route/create-or-edit-route.component';
import { CreateOrEditScheduleComponent } from './create-or-edit-schedule/create-or-edit-schedule.component';
import { CreateOrEditWharfComponent } from './create-or-edit-wharf/create-or-edit-wharf.component';

import { Datezone } from '../common/datezone.pipe';

@NgModule({
  declarations: [
  Datezone,

  CreateOrEditBoatComponent,
  CreateOrEditRouteComponent,
  CreateOrEditScheduleComponent,
  CreateOrEditWharfComponent,
  BoatComponent,
  RouteComponent,
  ScheduleComponent,
  WharfComponent,

  // ScheduleAuditComponent
  ],
  imports: [
  CommonModule,
  BoatBasicRoutingModule,
  SharedModule,
  ],
  entryComponents: [
  CreateOrEditBoatComponent,
  CreateOrEditRouteComponent,
  CreateOrEditScheduleComponent,
  CreateOrEditWharfComponent,

  ]
})

export class BoatBasicModule {}