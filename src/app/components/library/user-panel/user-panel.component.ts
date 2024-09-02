import { Component, NgModule, Input, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DxDropDownButtonModule } from 'devextreme-angular/ui/drop-down-button';
import { UserMenuSectionModule, UserMenuSectionComponent } from '../user-menu-section/user-menu-section.component';
import { IUser } from '../../../services/auth.service';
@Component({
  selector: 'user-panel',
  templateUrl: 'user-panel.component.html',
  styleUrls: ['./user-panel.component.scss'],
})

export class UserPanelComponent implements OnInit {
  @Input()
  menuItems: any;

  @Input()
  menuMode!: string;

  @Input()
  user!: IUser | null;

  @ViewChild(UserMenuSectionComponent) userMenuSection: UserMenuSectionComponent;

  constructor() {}

  ngOnInit(): void {
    setTimeout(()=>{
      console.log(this.user);
    },5000)
  }

  handleDropDownButtonContentReady({ component }) {
    component.registerKeyHandler('downArrow', () => {
      this.userMenuSection.userInfoList.nativeElement.focus();
    });
  }
}

@NgModule({
  imports: [
    DxDropDownButtonModule,
    UserMenuSectionModule,
    CommonModule,
  ],
  declarations: [UserPanelComponent],
  exports: [UserPanelComponent],
})
export class UserPanelModule { }
