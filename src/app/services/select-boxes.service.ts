import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SelectBoxesService {

  url=environment.baseUrl;
  token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhY2Nlc3NUb2tlbiIsIklkIjoiYTk3N2Y3OTEtZjgzMy00YmMyLWE1NDktYzgzZTExY2UyZWRhIiwiVXNlck5hbWUiOiJAYXdhaXNhbGkiLCJFbWFpbCI6ImF3YWlzYWhpYjc2NUBnbWFpbC5jb20iLCJleHAiOjE3MjQ5MTU3MzksImlzcyI6Imh0dHBzOi8veW91cmRvbWFpbi5jb20iLCJhdWQiOiJodHRwczovL2xvY2FsaG9zdDo3MDk4L3N3YWdnZXIvaW5kZXguaHRtbCJ9.syGOcsm5Dy31KqgRKgS9mKq5tsNdQVyYBKZ1meTdLSc'
  headersGet=new HttpHeaders({
    "Authorization":`Bearer ${this.token}`
  })
  constructor(private http:HttpClient) { }
   getUserSelectBox(){
    const headers=new HttpHeaders({
      "Authorization":`Bearer ${this.token}`
    })
    return  this.http.get(`${this.url}/api/UserSelectBox`,{headers});
   }

}
