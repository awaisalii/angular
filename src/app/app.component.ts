import { Component, HostBinding, OnDestroy, OnInit, } from '@angular/core';
import { AppInfoService, AuthService, ScreenService, ThemeService } from './services';
import { SignalService } from './services/signal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy ,OnInit {
  @HostBinding('class') get getClass() {
    return Object.keys(this.screen.sizes).filter((cl) => this.screen.sizes[cl]).join(' ');
  }

  constructor(private authService: AuthService,
              private themeService: ThemeService,
              private screen: ScreenService,
              private signalServie:SignalService,
              public appInfo: AppInfoService) {
    themeService.setAppTheme();
              
  }

  ngOnInit(): void {
    this.signalServie.startConnection();
    setTimeout(()=>{
      this.signalServie.askServerListener();
      this.signalServie.askServer();
    },2000)  
  }
  
  isAuthenticated() {
    return this.authService.loggedIn;
  }

  ngOnDestroy(): void {
    this.authService.getUser();
    this.screen.breakpointSubscription.unsubscribe();
    this.signalServie.hubConnection.off("askServerResponse");
  }
}
