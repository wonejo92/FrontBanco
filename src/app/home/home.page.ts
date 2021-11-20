import { Component } from '@angular/core';
import {login} from '../modelo/login';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Router} from '@angular/router';
import {ToastController} from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  login: login = new login();

  constructor(private http: HttpClient, private route: Router, private toastCtr: ToastController) {

  }

  async logearse() {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

    const urlencoded = new URLSearchParams();
    urlencoded.append('cedula', this.login.cedula);
    urlencoded.append('password', this.login.password);

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
    };

    const datos =await fetch('http://192.168.2.27:8081/mule?cedula='+this.login.cedula+'&password='+this.login.password, requestOptions)
      .then(response => response.text())
      .then(result => JSON.parse(result)['status']);
    if(datos==='successful'){
      localStorage.setItem('cedula',this.login.cedula);
      this.route.navigate(['cliet-view']);
    }else {
      this.presentToast();}
  }
  async presentToast(){
    const toast = await this.toastCtr.create({
      message:'Credenciales Incorrectas.',
      mode:'ios',
      duration:2000,
      position:'top'
    });
    toast.present();
  }
}
