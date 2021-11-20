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


  constructor(private http: HttpClient, private route: Router, private toastCtr: ToastController) { }

  ngOnInit() {
    this.cedula=localStorage.getItem('cedula');
    this.findaccount();
  }
   async findaccount(){
     const requestOptions = {
       method: 'GET'
     };
     const datos =await fetch('http://192.168.2.27:8081/mule/getcuentas?cedula_getCuenta='+this.cedula, requestOptions)
       .then(response => response.text())
       .then(result => JSON.parse(result))
       .catch(error => console.log('error', error));
     this.cuenta=datos.data[0];
  }

  async transaccion() {
    this.transferencia.cedula=this.cedula;
    this.transferencia.origen=this.cuenta;
    console.log(this.transferencia);

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify({
      cedula_transferencia: this.transferencia.cedula,
      banco_destino: this.transferencia.institucion_destino,
      cuenta_origen: this.transferencia.origen,
      cuenta_destino: this.transferencia.destino,
      monto: this.transferencia.monto,
      motivo: this.transferencia.motivo
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
    };
    const datos =await fetch('http://192.168.2.27:8081/mule/transferencia?cedula_transferencia='+this.transferencia.cedula+'&banco_destino='+this.transferencia.institucion_destino+'&cuenta_origen='+this.transferencia.origen+'&cuenta_destino='+this.transferencia.destino+'&monto='+this.transferencia.monto+'&motivo='+this.transferencia.motivo, requestOptions)
      .then(response => response.text())
      .then(result => JSON.parse(result).status)
      .catch(error => console.log('error', error));
    if(datos==='Se realizo la transferencia correctamente'){
      this.route.navigate(['cliet-view']);
      this.presentToast('Se realizo la transferencia correctamente');
    }else {
      this.presentToast('Error en la transferencia, Verifique los datos');
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

}
