import { Injectable, OnDestroy } from '@angular/core';
import { SignalService } from '../services/signal.service';
import { Router } from '@angular/router';
import { HubConnection, HubConnectionState } from '@microsoft/signalr';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGService implements OnDestroy {
  private subscriptions: Subscription[] = [];
  public isAuthenticated: boolean = false;

  constructor(public signalService: SignalService, public router: Router) {
    const tempId = localStorage.getItem("personId");
    this.initializeSignalR(tempId);
  }

  private async initializeSignalR(tempId: string | null): Promise<void> {
    try {
      if (!this.signalService.hubConnection || (this.signalService.hubConnection as any).state !== HubConnectionState.Connected) {
        await this.signalService.hubConnection.start();
      }

      if ((this.signalService.hubConnection as any).state === HubConnectionState.Connected) {
        this.setupListeners();
        this.reauthMe(tempId);
      }
    } catch (error) {
      console.error('Error initializing SignalR connection:', error);
    }
  }

  private setupListeners(): void {
    this.authMeListenerSuccess();
    this.authMeListenerFail();
    this.reauthMeListener();
  }

  public async authMe(username: string, password: string): Promise<void> {
    const personInfo = { username, password };
    try {
      await this.signalService.hubConnection.invoke("authMe", personInfo);
      this.signalService.toastr.info("Logging in attempt");
    } catch (err) {
      console.error(err);
    }
  }

  private authMeListenerSuccess(): void {
    this.signalService.hubConnection.on("authMeSuccess", (personId: string, personName: string) => {
      console.log('Auth success:', personId, personName);
      localStorage.setItem("personId", personId);
      this.signalService.personName = personName;
      this.isAuthenticated = true;
      this.signalService.toastr.success("Login successful");
      this.signalService.router.navigateByUrl("/Employee");
    });
  }

  private authMeListenerFail(): void {
    this.signalService.hubConnection.on("authMeResponseFail", () => {
      this.signalService.toastr.error("Wrong Credentials");
    });
  }

  public async reauthMe(personId: string | null): Promise<void> {
    if (!personId) return; // Handle case where personId is null
    try {
      await this.signalService.hubConnection.invoke("reauthMe", personId);
      this.signalService.toastr.info("Re-authentication attempt");
    } catch (error) {
      console.error(error);
    }
  }

  private reauthMeListener(): void {
    this.signalService.hubConnection.on("reauthMeResponse", (personId: string, personName: string) => {
      console.log('Reauth success:', personId, personName);
      this.signalService.personName = personName;
      this.isAuthenticated = true;
      this.signalService.toastr.success("Re-authenticated");
      if (this.signalService.router.url === "/auth") {
        this.signalService.router.navigateByUrl("/home");
      }
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
