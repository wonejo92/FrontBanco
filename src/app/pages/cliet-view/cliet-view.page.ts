import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {transferencia} from '../../modelo/transferencia';
import {window} from 'rxjs/operators';
import {Router} from '@angular/router';
import {ToastController} from '@ionic/angular';

@Component({
  selector: 'app-cliet-view',
  templateUrl: './cliet-view.page.html',
  styleUrls: ['./cliet-view.page.scss'],
})
export class ClietViewPage implements OnInit {
  transferencia: transferencia = new transferencia();
  cedula: string;
  cuenta: string;
  banco: string;


  constructor(private http: HttpClient, private route: Router, private toastCtr: ToastController) { }

  ngOnInit() {
    this.cedula=localStorage.getItem('cedula');
    this.banco=localStorage.getItem('Banco');
    this.findaccount();
  }
   async findaccount(){
     var requestOptions = {
       method: 'POST'
     };
     const datos =await  fetch('http://192.168.2.28:8081/mule/getCuenta?banco_cuenta='+this.banco+'&cedula_cuenta='+this.cedula, requestOptions)
       .then(response => response.text())
       .then(result => JSON.parse(result))
       .catch(error => console.log('error', error));
     this.cuenta=datos.data[0];
  }

  async transaccion() {

    this.transferencia.cedula=this.cedula;
    this.transferencia.origen=this.cuenta;
    console.log(this.transferencia);

    var requestOptions = {
      method: 'POST',
    };

    const datos = await fetch('http://192.168.2.28:8081/mule/transferencia?cedula='+this.transferencia.cedula+
      '&institucion_origen='+this.banco+'&institucion_destino='+this.transferencia.institucion_destino+
      '&cuenta_origen='+this.transferencia.origen+'&cuenta_destino='+this.transferencia.destino+
      '&monto='+this.transferencia.monto, requestOptions)
      .then(response => response.text())
      .then(result => JSON.parse(result).status)
      .catch(error => console.log('error', error));
    console.log(datos);
    if(datos==='Deposito Realizado'){
      this.presentToast('Transaccion exitosa !!');

      var requestOptions = {
        method: 'POST',
      };

      fetch('http://192.168.2.28:8081/mule/send_mail?sendEmail_cedula='+this.cedula+'&sendEmail_motivo='
        +this.transferencia.motivo+'&sendEmail_monto='+this.transferencia.monto, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
      this.route.navigate(['cliet-view']);
    }else {
      this.presentToast('Transaccion rechasada REVISE LOS DATOS !!');
      this.route.navigate(['cliet-view']);
    }

  }

  reload(){
    new Window().location.reload();
  }

  async presentToast(mensaje: string){
    const toast = await this.toastCtr.create({
      message:mensaje,
      mode:'ios',
      duration:2000,
      position:'top'
    });
    toast.present();
  }

  exit() {
    localStorage.clear();
    this.route.navigate(['home']);
  }
}
