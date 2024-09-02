import {
  Component, OnInit, NgModule
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DxButtonModule,
  DxDropDownButtonModule,
  DxTabPanelModule,
  DxValidationGroupModule,
  DxScrollViewModule,
} from 'devextreme-angular';
import {
  CardActivitiesModule,
  CardNotesModule,
  CardMessagesModule,
  StatusIndicatorModule,
} from 'src/app/components';
import { Task } from 'src/app/types/task';
import { DataService } from 'src/app/services';
import { TaskFormModule } from 'src/app/components/library/task-form/task-form.component';
import { DxToolbarModule } from 'devextreme-angular/ui/toolbar';
import { TasksService } from 'src/app/services/tasks.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  templateUrl: './planning-task-details.component.html',
  styleUrls: ['./planning-task-details.component.scss'],
  providers: [DataService],
})
export class PlanningTaskDetailsComponent implements OnInit {
  task: any;

  taskId ;

  taskName = 'Loading...';

  isLoading = false;

  constructor(private taskService: TasksService , private router:Router) {
  }

  loadData = () => {
    this.taskService.getTask(this.taskId).subscribe((data) => {
      this.task=data
      console.log(data)
      this.taskName=this.task.title;
      this.isLoading = false;
    });
  };

  ngOnInit(): void {
    const segments = this.router.url.split('/');
    const overviewIndex = segments.indexOf('overview');
    const id = parseInt(segments[overviewIndex + 1]);
    this.taskId = id;
    this.loadData();
  }

  refresh = () => {
    this.isLoading = true;
    this.loadData();
  }
}

@NgModule({
  imports: [
    DxButtonModule,
    DxDropDownButtonModule,
    DxTabPanelModule,
    DxValidationGroupModule,
    DxToolbarModule,

    CardActivitiesModule,
    CardNotesModule,
    CardMessagesModule,
    TaskFormModule,
    StatusIndicatorModule,
    DxScrollViewModule,
    CommonModule,
  ],
  providers: [],
  exports: [],
  declarations: [PlanningTaskDetailsComponent],
})
export class PlanningTaskDetailsModule { }
