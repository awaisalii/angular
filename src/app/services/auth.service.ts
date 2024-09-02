import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { environment } from 'src/environments/environment';
import { EmployeeService } from '../shared/employee.service';

export interface IUser {
  email: string;
  name?: string;
  avatarUrl?: string;
  imagepath?:string;
}
export interface IUser1 {
  email: string;
  name?: string;
  avatarUrl?: string;
  Role:string;
}

export interface IResponse {
  isOk: boolean;
  data?: IUser;
  message?: string;
}

const defaultPath = '/';
export const defaultUser: IUser = {
  email: 'jheart@dx-email.com',
  name: 'John Heart',
  avatarUrl: 'https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/images/employees/01.png',
};

@Injectable()
export class AuthService {
  private _user: IUser1 | null ;
  
  get loggedIn(): boolean {
    return !!this._user;
  }
  logout():void{
    this._user=null;
  }



  private _lastAuthenticatedPath: string = defaultPath;

  set lastAuthenticatedPath(value: string) {
    this._lastAuthenticatedPath = value;
  }
  url=environment.baseUrl;
  constructor(private router: Router , private employeeService:EmployeeService ) { }

  async logIn(email: string, password: string) {
    try {
      
      this.employeeService.Login(email, password).subscribe(
        response => {
          try {
            this._user = {
              email: response.email,
              name: response.userName,
              avatarUrl: response.imagePath,
              Role: response.Role,
            };
            debugger;
            localStorage.setItem("token", response.token);
            this.router.navigate(["dashboard"]);
          } catch (error) {
            console.error('Error during login processing:', error);
          }
        },
        error => {
          console.error('Login failed:', error);
        }
      );
      

      return {
        isOk: true,
        data: this._user,
      };
    } catch {
      return {
        isOk: false,
        message: 'Authentication failed',
      };
    }
  }

  async getUser() {
    try {
      // Send request

      return {
        isOk: true,
        data: this._user,
      };
    } catch {
      return {
        isOk: false,
        data: null,
      };
    }
  }

  async createAccount(email: string, password: string) {
    try {
      // Send request

      this.router.navigate(['/auth/create-account']);
      return {
        isOk: true,
      };
    } catch {
      return {
        isOk: false,
        message: 'Failed to create account',
      };
    }
  }

  async changePassword(email: string, recoveryCode: string) {
    try {
      // Send request

      return {
        isOk: true,
      };
    } catch {
      return {
        isOk: false,
        message: 'Failed to change password',
      };
    }
  }

  async resetPassword(email: string) {
    try {
      // Send request

      return {
        isOk: true,
      };
    } catch {
      return {
        isOk: false,
        message: 'Failed to reset password',
      };
    }
  }

  async logOut() {
    this.router.navigate(['/auth/login']);
  }
}

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private authService: AuthService ) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const isLoggedIn = this.authService.loggedIn;
    const isAuthForm = [
      'login',
      'reset-password',
      'create-account',
      'change-password/:recoveryCode',
    ].includes(route.routeConfig?.path || defaultPath);

    if (!isLoggedIn) {
      this.router.navigate(['/auth/login']);
    }

    if (isLoggedIn) {
      this.authService.lastAuthenticatedPath = route.routeConfig?.path || defaultPath;
    }

    debugger;
    return isLoggedIn || isAuthForm;
  }
}

// if(this.authGService.isAuthenticated){
//   this.authGService.router.navigateByUrl("auth");
//   return false;
// }  