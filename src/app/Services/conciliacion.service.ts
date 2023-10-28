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
  

  Search(codigoComercio: String, autorizacion: String, fechaProceso : String): Observable<any> {
    const url = `${this.url}/trxs?codigoComercio=${codigoComercio}&autorizacion=${autorizacion}&fechaProceso=${fechaProceso}`;
    return this.http.get<any>(url).catch(this.errorHandling.handleError);
  }

  
}

