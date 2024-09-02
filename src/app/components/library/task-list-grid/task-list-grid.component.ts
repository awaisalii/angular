import {
  Component, NgModule, ViewChild, EventEmitter, Output, Input, SimpleChanges, OnChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import {
  DxButtonModule,
  DxDataGridComponent,
  DxDataGridModule,
  DxDropDownButtonModule,
  DxSelectBoxModule,
  DxTextBoxModule,
  DxToolbarModule,
} from 'devextreme-angular';
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
import { DxTabsTypes } from 'devextreme-angular/ui/tabs';
import {
  StatusIndicatorModule,
} from 'src/app/components';
import { exportDataGrid as exportToPdf } from 'devextreme/pdf_exporter';
import { exportDataGrid as exportToXLSX } from 'devextreme/excel_exporter';
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver-es';
import { jsPDF } from 'jspdf';
import { taskPriorityList, taskStatusList } from 'src/app/types/task';
import { Task } from 'src/app/types/task';
import 'jspdf-autotable';
import { TasksService } from 'src/app/services/tasks.service';
import { error } from 'console';
import notify from 'devextreme/ui/notify';
import { custom } from 'devextreme/ui/dialog';
import { SelectBoxesService } from 'src/app/services/select-boxes.service';
@Component({
  selector: 'task-list-grid',
  templateUrl: './task-list-grid.component.html',
  styleUrls: ['./task-list-grid.component.scss'],
})
export class TaskListGridComponent implements OnChanges {
  @ViewChild(DxDataGridComponent, { static: false }) grid: DxDataGridComponent;

  @Input() dataSource: Task[];

  @Output() tabValueChanged: EventEmitter<any> = new EventEmitter<EventEmitter<any>>();
  @Output() RefrehGrid: EventEmitter<any> = new EventEmitter<EventEmitter<any>>();

  tasks: Task[];

  priorityList = taskPriorityList;

  statusList = taskStatusList;
  usersList;
  isLoading = true;

  useNavigation = true;

  constructor(private router: Router,private taskService:TasksService , private selecboxService:SelectBoxesService ) {
    this.selecboxService.getUserSelectBox().subscribe(
      response=>{
        this.usersList=response;
        notify('Updated Successfully',"Success",2000)
      }
    )
  }

  customDateFormatter = (date) => {
    if (!date) return '';
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    };
    return new Date(date).toLocaleString('en-US', options);
  };

  refresh() {
    this.grid.instance.refresh();
    this.RefrehGrid.emit();
  } 

  showColumnChooser() {
    this.grid.instance.showColumnChooser();
  }

  search(text: string) {
    this.grid.instance.searchByText(text);
  }

  onExportingToPdf() {
    const doc = new jsPDF();
    exportToPdf({
      jsPDFDocument: doc,
      component: this.grid.instance,
    }).then(() => {
      doc.save('Tasks.pdf');
    });
  };

  onExportingToXLSX() {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Tasks');

    exportToXLSX({
      component: this.grid.instance,
      worksheet,
      autoFilterEnabled: true,
    }).then(() => {
      workbook.xlsx.writeBuffer().then((buffer) => {
        saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'Tasks.xlsx');
      });
    });
  };

  ngOnChanges(changes: SimpleChanges) {
    if (changes.dataSource) {
      this.tasks = changes.dataSource.currentValue.filter((item) => !!item.status && !!item.priority);
    }
  };

  toogleUseNavigation = () => {
    this.useNavigation = !this.useNavigation;
  };

  tabsItemClick = (e: DxTabsTypes.ItemClickEvent) => {
    this.tabValueChanged.emit(e);
  };

  navigateToDetails = (e) => {
     const id= e.row.data.id;
      this.router.navigate(['/overview/'+id]);
  };
  onRowUpdating=(e)=>{
    const data={...e.oldData,...e.newData};
    this.taskService.UpdateTask(data).subscribe(
       {
        complete:()=>{
          this.refresh();
          notify("Updated SuccessFully","success",2000);
        }
       }
      );
    this.grid.instance.refresh();
  }

  deleteTask=(e)=>{
    e.event.preventDefault();
    let customDeleteConfirmDialog = custom({
      showTitle: false,
      messageHtml: "Are you sure you want to delete this record?",
      buttons: [{
        text: "Yes",
        onClick: () => true
      }, {
        text: "No",
        onClick: () => false
      }]
    });

    customDeleteConfirmDialog.show().then((dialogResult) => {
      if (dialogResult) {
        const deletedTaskId = e.row.data.id;
        this.taskService.deleteTask(deletedTaskId).subscribe({
          complete:()=>{
            this.refresh();
            notify("Deleted SuccessFully","success",2000);
          }
        })
      }
    })
  }
}

@NgModule({
  imports: [
    DxButtonModule,
    DxDataGridModule,
    DxDropDownButtonModule,
    DxSelectBoxModule,
    DxTextBoxModule,
    DxToolbarModule,

    StatusIndicatorModule,

    HttpClientModule,
    CommonModule,
  ],
  providers: [],
  exports: [TaskListGridComponent],
  declarations: [TaskListGridComponent],
})
export class TaskListModule { }
