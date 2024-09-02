import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  token = localStorage.getItem("token");
  url=environment.baseUrl;
  constructor(private httpClient:HttpClient) { }
  headersGet=new HttpHeaders({
    "Authorization":`Bearer ${this.token}`
  })
  getAllTasks(){
    const token = localStorage.getItem("token");
    const headers=new HttpHeaders({
      "Authorization" : `Bearer ${token}`,
    });
    var result=this.httpClient.get(`${this.url}/api/Tasks`,{headers});
    return result;
  }

  getTask(taskId:number){
    const token = localStorage.getItem("token");
    const headers=new HttpHeaders({
      "Authorization":`Bearer ${token}`
    })
   return this.httpClient.get(`${this.url}/api/Tasks/Task?taskId=`+taskId,{headers});
  }

  UpdateTask(data){
    const token = localStorage.getItem("token");
    const headers=new HttpHeaders({
      "Authorization":`Bearer ${token}`,
      "content-type": "application/json",
    })
    return this.httpClient.put(`${this.url}/api/Tasks`,data , {headers} )
  }

  createTask(task){
    const token = localStorage.getItem("token");
    task.id=0;
    task.progress="Active";
    task.assignedTo="";
     const headers= new HttpHeaders({
      "Authorization":`Bearer ${token}`,
      "content-type":'application/json'
     }) 
     return this.httpClient.post(`${this.url}/api/tasks`,task,{headers})
    }

    deleteTask(id: number){
      const headers=new HttpHeaders({
        "Authorization":`Bearer ${this.token}`
      })
    return  this.httpClient.delete(`${this.url}/api/Tasks/${id}`,{headers});
    }

    getMyTasks(){
      const token = localStorage.getItem("token");
      const headers=new HttpHeaders({
        "Authorization" : `Bearer ${token}`,
      });
      var result=this.httpClient.get(`${this.url}/api/Tasks/GetUserOwnTasks`,{headers});
      return result;
    }

}
