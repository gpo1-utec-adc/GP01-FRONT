import { Injectable } from '@angular/core';
import { host } from '../shared/hosts/main.host';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ErrorHandling } from '../shared/util/error-handling';

@Injectable({
  providedIn: 'root'
})
export class ConciliacionService {

  constructor(private http: HttpClient,
    private errorHandling: ErrorHandling) {
  }

  private url = `${host}api`;



  Search(autorizacion: any, codigoComercio: any,estado: any,estadoDevolucion: any,fechaProcesoInicio: any,fechaProcesoFin: any) {
    let url = `${this.url}/trxs?codigoComercio=${codigoComercio}&autorizacion${autorizacion}=&estado=${estado}&estadoDevolucion=${estadoDevolucion}&fechaProcesoInicio=${fechaProcesoInicio}&fechaProcesoFin=${fechaProcesoFin}`;
    return this.http.get<any>(url).catch(this.errorHandling.handleError)
  }

  
}

