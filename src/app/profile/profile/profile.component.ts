import { ChangeDetectorRef, Component } from '@angular/core';
import notify from 'devextreme/ui/notify';
import { forkJoin } from 'rxjs';
import {  ScreenService } from 'src/app/services';
import { EmployeeService } from 'src/app/shared/employee.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  profileId = 22;

  profileData: Record<string, any>;

  savedProfileData: Record<string, any>;
  cardData:any;
  isLoading = true;

  supervisorsList = [];

  isChangePasswordPopupOpened = false;

  isDataChanged = false;

  isContentScrolled = false;

  basicInfoItems: Record<string, any>[] = this.getBasicInfoItems();

  contactItems: Record<string, any>[] = this.getContactItems();

  addressItems: Record<string, any>[] = this.getAddressItems();

  constructor(private service: EmployeeService, public screen: ScreenService, private ref: ChangeDetectorRef) {
    forkJoin([
      service.getEmployeeProfile()
    ]).subscribe((profileData) => {
      console.log(profileData);
      this.profileData = profileData;
      this.cardData=profileData[0];
      this.setSavedData();
    });
    this.isLoading = false;
  }

  getBasicInfoItems(){
    return [
      { dataField: 'firstName', colSpan: 2 },
      { dataField: 'lastName', colSpan: 2 },
      {
        dataField: 'department',
        editorType: 'dxSelectBox',
        colSpan: 1,
        editorOptions: {
          items: ['Managment', 'Development'],
        }
      },
      {
        dataField: 'position',
        colSpan: 1,
      },
      {
        dataField: 'hiredDate',
        editorType: 'dxDateBox',
        colSpan: 1,
        editorOptions: {
          max: new Date(),
        }
      },
      {
        dataField: 'birthDate',
        colSpan: 1,
        editorType: 'dxDateBox',
        editorOptions: {
          max: new Date(),
        }
      },
    ]
  }

  getContactItems() {
    return [
      {
        dataField: 'phoneNumber',
        editorOptions: {
          mask: '+1(000)000-0000',
        }
      },
      {
        dataField: 'email',
        validators: [
          {type: 'email'}
        ]
      },
      {
        dataField: 'userName',
        colSpan: 2,
      },
      {
        dataField: 'status',
        colSpan: 2,
      },
      {
        dataField: 'supervisor',
        label: 'Supervisor',
      },
    ];
  }

  getAddressItems() {
    return [
      { dataField: 'country' },
      { dataField: 'city' },
      {
        dataField: 'state',
      },
      {
        dataField: 'address',
        colSpan: 2,
      },
    ];
  }

  dataChanged() {
    this.isDataChanged = true;
  }

  setSavedData(data = this.profileData) {
    this.savedProfileData = JSON.parse(JSON.stringify(data));
  }

  copyToClipboard(text, evt) {
    window.navigator.clipboard?.writeText(text);
    const tipText = 'Text copied';
    notify({
        message: tipText,
        minWidth: `${tipText.length + 2}ch`,
        width: 'auto',
        position: {of: evt.target, offset:'0 -30'}
      },
      'info', 500);
  };

  changePassword() {
    this.isChangePasswordPopupOpened = true;
  };

  cancel() {
    this.profileData = this.savedProfileData;
    this.ref.detectChanges();
    this.setSavedData();

    setTimeout(() => {
      this.isDataChanged = false;
    });
  }

  save() {
    notify({message: 'Data saved', position: {at: 'bottom center', my: 'bottom center'}}, 'success');
    this.isDataChanged = false;
    this.setSavedData();
  }

  scroll({reachedTop = false}) {
    this.isContentScrolled = !reachedTop;
  }

}
