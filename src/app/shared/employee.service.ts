import { Injectable } from '@angular/core';
import { Contact } from '../types/contact';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  employeeId:string;
  setEmployeeId(e:string){
     this.employeeId=e; 
  }

  getEmployeeId(){
    return this.employeeId;
  }

  


  url=environment.baseUrl;
  constructor(private httpClient:HttpClient) { }
  getEmployee(): Observable<Contact[]> {
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const endpointUrl = `${this.url}/User`; 
    return this.httpClient.get<Contact[]>(endpointUrl, { headers });
  }
  
  getEmployeebyId(id: string): Observable<Contact> {
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      "Authorization": `Bearer ${token}`
    });
  
    return this.httpClient.get<Contact>(`${this.url}/User/Single/${id}`, { headers });
  }
  
  getEmployeeProfile():any {
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      "Authorization": `Bearer ${token}`
    });
    debugger;
    return this.httpClient.get(`${this.url}/User/Profile`, { headers });
  }
  
 createEmployee(contact: any) {
  const token = localStorage.getItem("token");
    const headers = new HttpHeaders({
        "Authorization": `Bearer ${token}`
    });
    const formData = new FormData();
    for (const key in contact) {
        if (contact.hasOwnProperty(key)) {
            formData.append(key, contact[key]);
        }
    }
    formData.forEach((value, key) => {
        console.log(`${key}:`, value);
    });
    return this.httpClient.post(`${this.url}/User/api/register`, formData, { headers });
}

  Login(email: string, password: string) : Observable<Contact> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    
    const requestData = {
      email: email,
      password: password,
    };
    
    return this.httpClient.post<Contact>(`${this.url}/Login`, requestData, { headers });
  }


  UpdateEmployee(employee:any){
    const token=localStorage.getItem("token")
     const  headers=new HttpHeaders({
      "Authorization":`Bearer ${token}`
     }) 

     const formData=new FormData();
     for (const key in employee){
      if(employee.hasOwnProperty(key)){
        formData.append(key,employee[key]);
      }
     }
     formData.forEach((key, value)=>{
      console.log(`${key} has ${value}`)
     })

    return this.httpClient.put(`${this.url}/User`,formData,{headers})
  }


}
