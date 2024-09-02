import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/shared/employee.service';
import { Contact } from 'src/app/types/contact';
import { Messages } from 'src/app/types/messages';
import { Opportunities } from 'src/app/types/opportunities';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  contactId = 12;

  contactData: Contact;

  contactNotes: any;

  contactMessages: Messages;

  activeOpportunities: Opportunities;

  closedOpportunities: Opportunities;

  contactName = 'Loading...';

  isLoading = false;

  constructor(private employeeService:EmployeeService,private router:Router) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData = () => {
    const segments = this.router.url.split('/');
    const overviewIndex = segments.indexOf('overview');
    const id =segments[overviewIndex + 1];
    debugger;
    this.employeeService.getEmployeeProfile().subscribe(
      response=>{
        this.contactData=response;
        this.contactNotes=response.notes;
        console.log(this.contactData);
        debugger;
      }
    )
  };

  refresh = () => {
    this.isLoading = true;
    this.loadData();
  };
}
