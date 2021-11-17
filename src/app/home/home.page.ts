import { Component } from '@angular/core';
import {login} from '../modelo/login';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  login: login = new login();
  constructor(private http: HttpClient) {}

  logearse() {
    console.log(this.login);
    const res = this.http.get('https://jsonplaceholder.typicode.com/todos/1');
    res.subscribe((data)=>console.log(data));
  }
}
