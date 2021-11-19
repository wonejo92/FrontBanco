import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {transferencia} from '../../modelo/transferencia';
import {window} from "rxjs/operators";
import {Router} from "@angular/router";

@Component({
  selector: 'app-cliet-view',
  templateUrl: './cliet-view.page.html',
  styleUrls: ['./cliet-view.page.scss'],
})
export class ClietViewPage implements OnInit {
  transferencia: transferencia = new transferencia();
  cedula: string;
  cuenta: string;


  constructor(private http: HttpClient, private route: Router) { }

  ngOnInit() {
    this.cedula=localStorage.getItem('cedula');
    this.findaccount();
  }
   async findaccount(){
    const res= await  this.http.get('http://192.168.18.120:8000/api/private/mis_cuentas?cedula='+this.cedula).toPromise();
    this.cuenta=res['data'][0];
  }

  transaccion() {
    this.transferencia.cedula=this.cedula;
    this.transferencia.origen=this.cuenta;
    console.log(this.transferencia);

    const raw = JSON.stringify({
      "cedula": this.transferencia.cedula,
      "institucion_destino": this.transferencia.institucion_destino,
      "origen": this.transferencia.origen,
      "destino": this.transferencia.destino,
      "monto": this.transferencia.monto,
      "motivo": this.transferencia.motivo
    });

      return this.http.post(
      'http://192.168.18.120:8000/api/private/transferencia',
      raw,
      {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
        responseType: 'json'
      }
    ).toPromise()
        .then(data=>{console.log(data);});
     this.transferencia.cedula='';
     this.transferencia.monto=0;
     this.transferencia.destino='';
  }

  reload(){
    new Window().location.reload();
  }

}
