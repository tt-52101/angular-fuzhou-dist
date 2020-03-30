import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SalerTicketComponent } from './salerticket/salerticket.component';
import { SalerDailyComponent } from './salerdaily/salerdaily.component';
import { PayMethodComponent } from './paymethod/paymethod.component';
import { SourceComponent } from './source/source.component';
import { TravelComponent, } from './travel/travel.component';
import { OtaComponent } from './ota/ota.component';
import { RouteComponent } from './route/route.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { CheckComponent } from './check/check.component';


const routes: Routes = [{
	path: '',
	children: [
	{ path: 'salerticket', component: SalerTicketComponent, data: { title: '销售员售票统计' } },
	{ path: 'salerdaily', component: SalerDailyComponent, data: { title: '销售员日结统计' } },
	{ path: 'paymethod', component: PayMethodComponent, data: { title: '支付方式统计' } },
	{ path: 'source', component: SourceComponent, data: { title: '订单来源统计' } },
	{ path: 'travel', component:TravelComponent, data: { title: '旅行社售票统计' } },
	{ path: 'ota', component: OtaComponent, data: { title: 'OTA售票统计' } },
	{ path: 'route', component: RouteComponent, data: { title: '航线售票统计' } },
	{ path: 'schedule', component: ScheduleComponent, data: { title: '航班售票统计' } },
	{ path: 'check', component: CheckComponent, data: { title: '航班检票统计' } },

	]
}, ];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})

export class ReportRoutingModule {}