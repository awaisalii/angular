import {
  AfterViewInit,
  Component,
  NgModule,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DxTextBoxModule,
  DxFormModule,
  DxValidatorModule,
  DxDateBoxModule,
  DxFileUploaderModule,
} from 'devextreme-angular';
import {
  FormTextboxModule,
  FormPhotoUploaderModule,
} from 'src/app/components';
import { ContactBase, newContact } from 'src/app/types/contact';
import { getSizeQualifier } from 'src/app/services/screen.service';


@Component({
  selector: 'contact-new-form',
  templateUrl: './contact-new-form.component.html',
  providers: [],
})

export class ContactNewFormComponent  implements OnInit   {
  newUser: ContactBase = newContact;
  getSizeQualifier = getSizeQualifier;
  constructor() { 
  }
  ngOnInit(): void {
    console.log(this.newUser)
  }
  
  

  onFileUploaded(e) {
    const fileInfo = e.file;
    console.log('File uploaded:', fileInfo);
  }
  getNewContactData = ()=> ({ ...this.newUser })
}

@NgModule({
  imports: [
    DxTextBoxModule,
    DxFormModule,
    DxValidatorModule,

    FormTextboxModule,
    FormPhotoUploaderModule,
    DxDateBoxModule,
    CommonModule,
    DxFileUploaderModule
  ],
  declarations: [ContactNewFormComponent],
  exports: [ContactNewFormComponent],
})
export class ContactNewFormModule { }
