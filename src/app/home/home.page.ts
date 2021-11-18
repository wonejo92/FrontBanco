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
    try {
      const datos = await this.http.post('http://192.168.18.120:8000/api/login?cedula='
        + this.login.cedula + '&password=' + this.login.password, {
        cedula: this.login.cedula.toString(),
        password: this.login.password.toString()
      }).toPromise().then(data=>data !== undefined ? data['status'] : 'error');
      console.log(datos);
      if(datos==='successful'){
        this.route.navigate(['cliet-view']);
      }else {
        this.presentToast();}
    }catch (e){}
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

