import {
  Component, NgModule, Input, OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DxButtonModule,
  DxFormModule,
  DxLoadPanelModule,
  DxSelectBoxModule,
  DxTextBoxModule,
  DxTextAreaModule,
  DxToolbarModule,
  DxValidatorModule,
} from 'devextreme-angular';
import {
  StatusIndicatorModule,
  FormItemDateModule,
  FormTextboxModule,
} from 'src/app/components';
import { taskPriorityList, taskStatusList } from 'src/app/types/task';
import { Task } from 'src/app/types/task';
import { getSizeQualifier } from 'src/app/services/screen.service';
import { DxButtonTypes } from 'devextreme-angular/ui/button';
import { ScreenService } from '../../../services';
import { ToolbarFormModule } from 'src/app/components/utils/toolbar-form/toolbar-form.component';
import { TasksService } from 'src/app/services/tasks.service';
import { error } from 'console';
import { SelectBoxesService } from 'src/app/services/select-boxes.service';

@Component({
  selector: 'task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent implements OnInit {
  @Input() task: any;

  @Input() isLoading: boolean = false;

  @Input() isCreateMode: boolean = false;

  savedData: Task = null;

  isEditing = false;

  statusList = taskStatusList;

  usersList ;

  priorityList=taskPriorityList;
  getSizeQualifier = getSizeQualifier;

  constructor(protected screen: ScreenService , private taskSevice:TasksService , private selectBoxService:SelectBoxesService) {}

  ngOnInit() {
    this.isEditing = this.isCreateMode;
    this.selectBoxService.getUserSelectBox().subscribe(response=>{
      this.usersList=response;
      console.log(this.usersList);
      console.log(this.task.assignedToId)
    }
    )
  }
  handleEditClick = () => {
    this.savedData = { ...this.task }
    this.isEditing = true;

  };
  adjustHeight(event: any): void {
    const element = event.element;
    element.style.height = 'auto';
    element.style.height = element.scrollHeight + 'px';
}

  handleSaveClick = (e) => {
    const data=this.task;
    this.taskSevice.UpdateTask(data).subscribe({
      complete:()=>{
        console.log("Comleted");
      },
      error:(error)=>{
        console.log(error);
      }
    })
    this.isEditing = false;
  };

  handleCancelClick = () => {
    this.task = { ...this.savedData };
    this.isEditing = false;
  };

  getNewTaskData = ()=> ({ ...this.task });
}

@NgModule({
  imports: [
    DxButtonModule,
    DxFormModule,
    DxLoadPanelModule,
    DxSelectBoxModule,
    DxTextBoxModule,
    DxTextAreaModule,
    DxToolbarModule,
    DxValidatorModule,
    FormTextboxModule,
    StatusIndicatorModule,
    FormItemDateModule,
    ToolbarFormModule,
    CommonModule,
  ],
  providers: [],
  exports: [TaskFormComponent],
  declarations: [TaskFormComponent],
})
export class TaskFormModule { }
