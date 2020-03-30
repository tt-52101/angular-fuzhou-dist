import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';

import { BasicConfigRoutingModule } from './basic-config-routing.module';

import { BranchComponent } from './branch.component';
import { BranchUserComponent } from './branch-user.component';
import { DateDictionaryComponent } from './date-dictionary.component';
import { PayMethodComponent } from './pay-method.component';

import { AppVersionComponent } from './appversion.component';
import { TranslationComponent } from './translation.component';

import { CreateOrEditBranchComponent } from './create-or-edit-branch/create-or-edit-branch.component';
import { CreateOrEditBranchUserComponent } from './create-or-edit-branch-user/create-or-edit-branch-user.component';
import { CreateOrEditDateDictionaryComponent } from './create-or-edit-date-dictionary/create-or-edit-date-dictionary.component';
import { CreateOrEditPayMethodComponent } from './create-or-edit-pay-method/create-or-edit-pay-method.component';

import { CreateOrEditAppVersionComponent } from './create-or-edit-app-version/create-or-edit-app-version.component';


import { CreateOrEditTranslationComponent } from './create-or-edit-translation/create-or-edit-translation.component';


@NgModule({
  declarations: [
  BranchComponent,
  BranchUserComponent,
  DateDictionaryComponent,
  PayMethodComponent,
  AppVersionComponent,
  TranslationComponent,
  CreateOrEditBranchComponent,
  CreateOrEditBranchUserComponent,
  CreateOrEditDateDictionaryComponent,
  CreateOrEditPayMethodComponent,
  CreateOrEditAppVersionComponent,
  CreateOrEditTranslationComponent

  ],
  imports: [
  CommonModule,
  BasicConfigRoutingModule,
  SharedModule,

  ],
  entryComponents: [
  CreateOrEditBranchComponent,
  CreateOrEditBranchUserComponent,
  CreateOrEditDateDictionaryComponent,
  CreateOrEditPayMethodComponent,
  CreateOrEditAppVersionComponent,
  CreateOrEditTranslationComponent

  ]
})

export class BasicConfigModule {}