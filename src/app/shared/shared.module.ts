import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactPanelModule } from '../components/library/contact-panel/contact-panel.component';
import { ContactStatusModule, FormPopupModule } from '../components';
import { ContactNewFormModule } from '../components/library/contact-new-form/contact-new-form.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ContactPanelModule
  ],
  exports:[
    ContactPanelModule,
    ContactStatusModule,
    ContactNewFormModule,
    FormPopupModule
  ]
  
})
export class SharedModule { }
