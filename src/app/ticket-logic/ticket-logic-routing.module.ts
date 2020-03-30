import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountComponent } from './account.component';
import { AccountDetailComponent } from './account-detail.component';
import { ActivityComponent } from './activity.component';
import { ActivityDetailComponent } from './activity-detail.component';
import { ActivityTempDetailComponent } from './activity-temp-detail.component';
import { PriceAuditComponent } from './price-audit.component';
import { TicketComponent } from './ticket.component';
import { TicketDetailComponent } from './ticket-detail.component';
import { TicketDetailHistoryComponent } from './ticket-detail-history.component';
import { TicketIntroduceComponent } from './ticket-introduce.component';
import { TicketPriceComponent } from './ticket-price.component';
import { TicketStationComponent } from './ticket-station.component';
import { TicketStationEnableComponent } from './ticket-station-enable.component';
import { TicketUserEnableComponent } from './ticket-user-enable.component';

import { ScenicSpotComponent } from './scenic-spot.component';
import { CollectComponent } from './collect.component';

// Collect
// collect


const routes: Routes = [{
	path: '',
	children: [
	{ path: 'account', component: AccountComponent, data: { title: '账单管理' } },
	{ path: 'account-detail', component: AccountDetailComponent, data: { title: '结账单明细' } },
	{ path: 'activity', component: ActivityComponent, data: { title: '订单管理' } },
	{ path: 'activity-detail', component: ActivityDetailComponent, data: { title: '单据明细' } },
	{ path: 'activity-temp-detail', component: ActivityTempDetailComponent, data: { title: '暂存订单明细' } },
	{ path: 'price-audit', component: PriceAuditComponent, data: { title: '票价审核' } },
	{ path: 'ticket', component: TicketComponent, data: { title: '票型管理' } },
	{ path: 'ticket-detail', component: TicketDetailComponent, data: { title: '票据详情' } },
	{ path: 'ticket-detail-history', component: TicketDetailHistoryComponent, data: { title: '验票记录管理' } },
	{ path: 'ticket-introduce', component: TicketIntroduceComponent, data: { title: '票型介绍' } },
	{ path: 'ticket-price', component: TicketPriceComponent, data: { title: '票种价格' } },
	{ path: 'ticket-station', component: TicketStationComponent, data: { title: '售票站点' } },
	{ path: 'ticket-station-enable', component: TicketStationEnableComponent, data: { title: '站点可售票' } },
	{ path: 'ticket-user-enable', component: TicketUserEnableComponent, data: { title: '人员可售票' } },

	{ path: 'scenic-spot', component: ScenicSpotComponent, data: { title: '景区管理' } },
	{ path: 'collect', component: CollectComponent, data: { title: '财务收款' } },
	]
}, ];


@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})

export class TicketLogicRoutingModule {}