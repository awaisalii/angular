import { Component, OnInit, ViewChild } from '@angular/core';
import { DxTabsTypes } from 'devextreme-angular/ui/tabs';
import { DxTextBoxTypes } from 'devextreme-angular/ui/text-box';
import { TaskFormComponent } from 'src/app/components/library/task-form/task-form.component';
import { TaskListGanttComponent } from 'src/app/components/library/task-list-gantt/task-list-gantt.component';
import { TaskListGridComponent } from 'src/app/components/library/task-list-grid/task-list-grid.component';
import { TaskListKanbanComponent } from 'src/app/components/library/task-list-kanban/task-list-kanban.component';
import {  ScreenService } from 'src/app/services';
import notify from 'devextreme/ui/notify';
import { Task, newTask } from 'src/app/types/task';
import { taskPanelItems } from 'src/app/types/resource';
import { forkJoin, map, Observable } from 'rxjs';
import { TasksService } from 'src/app/services/tasks.service';
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  @ViewChild('planningDataGrid', { static: false }) dataGrid: TaskListGridComponent;

  @ViewChild('planningGantt', { static: false }) gantt: TaskListGanttComponent;

  @ViewChild('planningKanban', { static: false }) kanban: TaskListKanbanComponent;

  @ViewChild(TaskFormComponent, { static: false }) taskForm: TaskFormComponent;

  newTask = newTask;

  taskPanelItems = taskPanelItems;

  displayTaskComponent = this.taskPanelItems[0].text;

  isAddTaskPopupOpened = false;

  displayGrid = this.displayTaskComponent === this.taskPanelItems[0].text;

  displayKanban = this.displayTaskComponent === this.taskPanelItems[1].text;

  taskCollections$: Observable<{ allTasks: Task[]; filteredTasks: Task[] }>;
  tasks:any;
  constructor( protected screen: ScreenService ,private taskService:TasksService ) {
  }

  ngOnInit(): void {
   this.loadData();
  }

  RefrehGrid(e){
    this.loadData();
  }
  loadData(){
    this.taskService.getAllTasks().subscribe(data=>this.tasks=data);
  }

  tabValueChange(e: DxTabsTypes.ItemClickEvent) {
    const index = e.itemIndex;
    if(index==1){
      this.taskService.getMyTasks().subscribe(
        response=>{
          this.tasks=response;
          console.log(this.tasks);
          debugger;
        }
      )
    }else{
      this.loadData();
    }
  };

  addTask = () => {
    this.isAddTaskPopupOpened = true;
  };

  onClickSaveNewTask = () => {
    console.log(this.newTask);
    this.taskService.createTask(this.newTask).subscribe({
      complete:()=>{
        this.RefrehGrid("Refresh");
        notify("Saved Successfully",'success',2000);
      }}
    )

  };

  refresh = () => {
    if (this.displayGrid) {
      this.dataGrid.refresh();
    } else if (this.displayKanban) {
      this.kanban.refresh();
    } else {
      this.gantt.refresh();
    }
  };

  chooseColumnDataGrid = () => this.dataGrid.showColumnChooser();

  searchDataGrid = (e: DxTextBoxTypes.InputEvent) => this.dataGrid.search(e.component.option('text'));

  exportToPdf = () => {
    if (this.displayGrid) {
      this.dataGrid.onExportingToPdf();
    } else {
      this.gantt.onExporting();
    }
  };

  exportDataGridToXSLX = () => this.dataGrid.onExportingToXLSX();
}
