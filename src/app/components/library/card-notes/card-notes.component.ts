import { CommonModule } from '@angular/common';
import {
  Component, Input, NgModule, OnInit,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  DxTextAreaModule,
  DxToolbarModule,
  DxButtonModule,
  DxValidationGroupModule,
  DxValidatorModule,
  DxScrollViewModule
} from 'devextreme-angular';
import { NotesService } from 'src/app/services/notes.service';
import { Notes, Note } from 'src/app/types/notes';
import { EventEmitter } from 'stream';

@Component({
  selector: 'card-notes',
  templateUrl: './card-notes.component.html',
  styleUrls: ['./card-notes.component.scss'],
})
export class CardNotesComponent implements OnInit {
  @Input() user: string;

  @Input() items: any;

  constructor(private notesService:NotesService,private router:Router){

  }

  ngOnInit(): void {
    
  }

  nodeText = '';
  taskId:any;
  userId:any;
  add = (e) => {
    console.log(this.items);
    if (!e.validationGroup.validate().isValid) {
      return;
    }
    const segments = this.router.url.split('/');
    const overviewIndex = segments.indexOf('overview');
    const userId=segments[overviewIndex + 1];
    const id = parseInt(segments[overviewIndex + 1])
    if(segments[1]!="Employee"){
      this.taskId=id;
    }else{
      this.userId=userId;
    };

    const newNote: any = {
      taskId:this.taskId,
      username: this.user,
      date: new Date(),
      text: this.nodeText,
      userId:this.userId,
    };
debugger;
    this.notesService.createNote(newNote).subscribe({
      complete:()=>{
        this.items.push(newNote);        
      }
    })

    e.validationGroup.reset();
  };
}

@NgModule({
  imports: [
    DxTextAreaModule,
    DxToolbarModule,
    DxButtonModule,
    DxValidationGroupModule,
    DxValidatorModule,
    DxScrollViewModule,
    CommonModule,
  ],
  declarations: [CardNotesComponent],
  exports: [CardNotesComponent],
})
export class CardNotesModule { }
