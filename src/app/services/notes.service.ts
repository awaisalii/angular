import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  // token = localStorage.getItem("token");
  url=environment.baseUrl;
  constructor(private httpClient:HttpClient) { }
 

  createNote(note:any){
    const token = localStorage.getItem("token");
    const headers=new HttpHeaders({
      "Authorization":`Bearer ${token}`
    })
    debugger;
    return this.httpClient.post(`${this.url}/api/Notes`,note,{headers});
  }
}
