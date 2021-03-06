import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BoatComponent } from './boat.component';
import { RouteComponent } from './route.component';
import { ScheduleComponent } from './schedule.component';
import { WharfComponent } from './wharf.component';
// import { ScheduleAuditComponent } from './schedule-audit.component';

const routes: Routes = [{
	path: '',
	children: [
	{ path: 'boat', component: BoatComponent, data: { title: '游船管理' } },
	{ path: 'route', component: RouteComponent, data: { title: '航线管理' } },
	{ path: 'schedule', component: ScheduleComponent, data: { title: '航班管理' } },
	{ path: 'wharf', component: WharfComponent, data: { title: '码头管理' } },


	// { path: 'schedule-audit', component: ScheduleAuditComponent, data: { title: '航班审核' } },

	]
}, ];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})

export class BoatBasicRoutingModule {}
