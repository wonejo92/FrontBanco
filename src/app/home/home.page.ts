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
    console.log(this.login);
    var requestOptions = {
      method: 'POST',
    };

    const datos = await fetch('http://192.168.2.28:8081/mule/login?cedula_login='+this.login.cedula+'&banco='+this.login.banco, requestOptions)
      .then(response => response.text())
      .then(result => JSON.parse(result).status)
      .catch(error => console.log('error', error));
    if (datos==='1'){
      localStorage.setItem('cedula',this.login.cedula);
      localStorage.setItem('Banco',this.login.banco);
      this.route.navigate(['cliet-view']);
    }else{
      this.presentToast();
    }
  }
  async presentToast(){
    const toast = await this.toastCtr.create({
      message:'Credenciales o banco incorrecto.',
      mode:'ios',
      duration:2000,
      position:'top'
    });
    toast.present();
  }
}
