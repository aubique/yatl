import {Injectable} from '@angular/core';
import {TaskFull} from '../model/task-full';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private URL_USER_1: string;

  constructor(private http: HttpClient) {
    this.URL_USER_1 = 'http://localhost:8080/rest/user/1';
  }

  public doGetRequest(): Observable<Array<TaskFull>> {
    return this.http
      .get<Array<TaskFull>>(this.URL_USER_1);
    //.get<Array<TaskFull>>('/assets/mock/get-request.json');
  }

  public doPostRequest(itemToSend: TaskFull): Observable<TaskFull> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    //TODO: do a real POST request to create new item
    return this.http
      .post<TaskFull>(this.URL_USER_1, itemToSend, httpOptions);
    //.get<TaskFull>('/assets/mock/put-request.json');
  }

  public doPutRequest(itemToSend: TaskFull): void {
    //TODO: do a real PUT request to update that item
    console.log('PUT request is mocked');
  }
}
