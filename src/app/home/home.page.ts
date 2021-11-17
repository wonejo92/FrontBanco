import { Component } from '@angular/core';
import {login} from '../modelo/login';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  login: login = new login();
  constructor() {}

  logearse() {
    console.log(this.login);
  }
}
