import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TaskFull } from '../models/task-full';
import { TaskCore } from '../models/task-core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  private static readonly API_URL = '/api/todo';
  private readonly httpOptions: { headers: HttpHeaders };

  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }

  public getAllTasks(): Observable<TaskFull[]> {
    const url = ApiService.API_URL;

    return this.http
      // .get<Array<TaskFull>>('/assets/mock/get-request.json');
      .get<Array<TaskFull>>(url);
    // .pipe(map(tasks => tasks.slice(0, 6)));
  }

  public postTask(task: TaskFull): Observable<TaskFull> {
    const url = ApiService.API_URL;

    return this.http
      .post<TaskFull>(url, task, this.httpOptions);
    // .get<TaskFull>('/assets/mock/post-request.json');
  }

  public putTask(task: TaskFull): Observable<any> {
    const url = `${ApiService.API_URL}/${task.core.id}`;

    return this.http.put<void>(url, task, this.httpOptions);
  }

  // public deleteTask(task: TaskFull): Observable<any> {
  public deleteTask(taskId: number): Observable<any> {
    const url = `${ApiService.API_URL}/${taskId}`;

    return this.http.delete<void>(url);
  }

  // public patchTaskCoreList(taskCoreList: TaskCore[]): Observable<any> {
  //   const url = ApiService.API_URL;
  //
  //   return this.http.patch<void>(url, taskCoreList, this.httpOptions);
  // }

  public patchTaskComplete(task: TaskFull): Observable<any> {
    const url = `${ApiService.API_URL}/${task.core.id}`;
    const taskOrderDto = {isComplete: task.isComplete};

    return this.http.patch<void>(url, taskOrderDto, this.httpOptions);
  }

  public patchPartialTask(id: number | string, taskCompleteDto: Partial<TaskFull>): Observable<any> {
    const url = `${ApiService.API_URL}/${id}`;
    return this.http.patch<void>(url, taskCompleteDto, this.httpOptions);
  }

  public patchCoreList(coreList: TaskCore[]): Observable<any> {
    const url = `${ApiService.API_URL}`;
    console.log(url);
    return this.http.patch<void>(url, coreList, this.httpOptions);
  }
}
