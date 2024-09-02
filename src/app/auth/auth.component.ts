import { Component } from '@angular/core';
import { SignalService } from '../services/signal.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  constructor( public signalService:SignalService ,  ) {
    
  }
}
