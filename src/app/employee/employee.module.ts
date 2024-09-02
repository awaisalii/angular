import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeComponent } from './employee/employee.component';
import { DevExtremeModule, DxButtonModule, DxDropDownButtonModule, DxScrollViewModule, DxToolbarModule } from 'devextreme-angular';
import { CardActivitiesModule, CardMessagesModule, CardNotesModule, ContactStatusComponent, ContactStatusModule } from '../components';
import { SharedModule } from '../shared/shared.module';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { ContactFormModule } from '../components/library/contact-form/contact-form.component';
import { ContactCardsModule } from '../components/utils/contact-cards/contact-cards.component';


@NgModule({
  declarations: [
    EmployeeComponent,
    EmployeeDetailsComponent,
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    DevExtremeModule,
    SharedModule,
    DxButtonModule,
    DxDropDownButtonModule,
    DxScrollViewModule,
    DxToolbarModule,

    ContactFormModule,
    ContactCardsModule,

    CardActivitiesModule,
    CardNotesModule,
    CardMessagesModule,
  ]
})
export class EmployeeModule { }
