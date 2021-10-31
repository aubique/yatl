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

  // GET-request to fetch all the todos
  public getAllTasks(): Observable<TaskFull[]> {
    const url = ApiService.API_URL;

    return this.http
      // .get<Array<TaskFull>>('/assets/mock/get-request.json');
      .get<Array<TaskFull>>(url);
  }

  // POST-request to add new task
  public postTask(task: TaskFull): Observable<TaskFull> {
    const url = ApiService.API_URL;

    return this.http
      .post<TaskFull>(url, task, this.httpOptions);
    // .get<TaskFull>('/assets/mock/post-request.json');
  }

  // PUT-request to replace the existing task by ID
  public putTask(task: TaskFull): Observable<TaskFull> {
    const url = `${ApiService.API_URL}/${task.core.id}`;

    return this.http.put<TaskFull>(url, task, this.httpOptions);
  }

  // DELETE-request to remove task by ID
  public deleteTask(taskId: number): Observable<any> {
    const url = `${ApiService.API_URL}/${taskId}`;

    return this.http.delete<void>(url);
  }

  // PATCH-request to update `isComplete` for a task
  public patchPartialTask(id: number | string, taskCompleteDto: Partial<TaskFull>): Observable<any> {
    const url = `${ApiService.API_URL}/${id}`;

    return this.http.patch<void>(url, taskCompleteDto, this.httpOptions);
  }

  // PATCH-request to update only the most frequent information (i.e. order-field)
  // by updating the Core part of the Task list
  public patchCoreList(coreList: TaskCore[]): Observable<any> {
    const url = `${ApiService.API_URL}`;

    return this.http.patch<void>(url, coreList, this.httpOptions);
  }
}
