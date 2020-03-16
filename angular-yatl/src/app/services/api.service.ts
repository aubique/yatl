import {Injectable} from '@angular/core';
import {TodoDetails} from '../shared/todo-details';
import {HttpClient} from '@angular/common/http';
import {DataService} from './data.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private storage: DataService) {
  }

  loadData() {
    this.storage.$data = this.http
      .get('/assets/mock/todo-list.json')
      .pipe(map(json => json as Array<TodoDetails>));

    this.storage.$data.subscribe(data => {
      // Clear array and fill with received data
      this.storage.clearArray();
      data.forEach((array) => this.storage.itemList.push(array));
      // Count completed and non-completed items
      this.storage.ongoing = data.filter(array => (array.completed == false)).length;
      this.storage.completed = data.filter(array => (array.completed == true)).length;
    });
  }
}
