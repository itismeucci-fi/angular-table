import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ServerData } from '../types/Employee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {



  constructor(private http: HttpClient) { }


  getData(url: string, pageSize?: number, pageNumber?: number): Observable<ServerData> {

    const params = new HttpParams()
    .set('page', pageNumber || 0)
    .set('size', pageSize || 10)

    return this.http.get<ServerData>(url, {params: params});
  }
}
