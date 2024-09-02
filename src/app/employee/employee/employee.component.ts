import { Component, OnInit, ViewChild } from '@angular/core';
import {
  DxDataGridComponent,
} from 'devextreme-angular';
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import { exportDataGrid as exportDataGridToXLSX } from 'devextreme/excel_exporter';
import { Contact, contactStatusList } from 'src/app/types/contact';
import { DxDropDownButtonTypes } from 'devextreme-angular/ui/drop-down-button';
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver-es';
import { jsPDF } from 'jspdf';
import notify from "devextreme/ui/notify";
import { formatPhone } from 'src/app/pipes/phone.pipe';
import { ContactNewFormComponent, ContactNewFormModule } from 'src/app/components/library/contact-new-form/contact-new-form.component';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/shared/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  @ViewChild(DxDataGridComponent, { static: true }) dataGrid: DxDataGridComponent;

  @ViewChild(ContactNewFormComponent, { static: false }) contactNewForm: ContactNewFormComponent;

  statusList = contactStatusList;

  filterStatusList = ['All', ...contactStatusList];

  isPanelOpened = false;

  dataSource:Contact[];

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.employeeService.getEmployee().subscribe(m=>{this.dataSource=m ; console.log(m) });
  }

  isAddContactPopupOpened = false;

  userId: number;


  constructor(private employeeService:EmployeeService, private router:Router) {}

  addContact() {
    this.isAddContactPopupOpened = true;
  };

  refresh = () => {
    this.dataGrid.instance.refresh();
  };

  rowClick(e: DxDataGridTypes.RowClickEvent) {
    const { data } = e;

    this.userId = data.id;
    this.isPanelOpened = true;
  }

  onOpenedChange = (value: boolean) => {
    if (!value) {
      this.userId = null;
    }
  };

  onPinnedChange = () => {
    this.dataGrid.instance.updateDimensions();
  };

  filterByStatus = (e: DxDropDownButtonTypes.SelectionChangedEvent) => {
    const { item: status }: { item: any } = e;

    if (status === 'All') {
      this.dataGrid.instance.clearFilter();
    } else {
      this.dataGrid.instance.filter(['status', '=', status]);
    }
  };

  customizePhoneCell = ({ value }) => value ? formatPhone(value) : undefined;

  onExporting(e) {
    if (e.format === 'pdf') {
      const doc = new jsPDF();
      exportDataGridToPdf({
        jsPDFDocument: doc,
        component: e.component,
      }).then(() => {
        doc.save('Contacts.pdf');
      });
    } else {
      const workbook = new Workbook();
      const worksheet = workbook.addWorksheet('Contacts');

      exportDataGridToXLSX({
        component: e.component,
        worksheet,
        autoFilterEnabled: true,
      }).then(() => {
        workbook.xlsx.writeBuffer().then((buffer) => {
          saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'Contacts.xlsx');
        });
      });
      e.cancel = true;
    }
  }

  onClickSaveNewContact = () => {
    const newData = this.contactNewForm.getNewContactData();
    this.employeeService.createEmployee(newData).subscribe(
      response=>{
        console.log(response);
         notify('Created Successfully','success',2000);
      }
    )
  };
  nameTemplateName(e:any){
    return e.data.firstName+" "+ e.data.lastName;
  }
  nameTemplatePosition(e:any){
        return e.data.position;
  }

  goToEmployeeDetails =(e)=>{
    debugger;
    const employeeId = e.row.data.id;
    this.router.navigate([`/Employee/overview/${employeeId}`]);
  }
  

  SalariedTemplate(e){
    let htmlContent: string;
  if (e.data.salaried === true) {
      htmlContent = `<div class="trueSalaried"  >True</div>`;
  } else {
      htmlContent = `<div class="FalseSalaried""> False</div>`;
  }
  return htmlContent;
  }
}
