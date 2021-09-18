import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Cars } from '../classes/cars';
import { Observable } from 'rxjs';
import { CarFetch } from '../classes/carFetch';
import { map } from 'rxjs/operators';
import { CarNew } from '../classes/carNew';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  headers = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');
  httpOptions = {
    headers: this.headers
  }

  constructor(private http:HttpClient) { 
  
  }

  url:string = "http://localhost:3000/Cars";
  getCars() {
    return this.http.get<Cars[]>(this.url);
  }

  create(data: any) {
    return this.http.post<Cars[]>(this.url, data).pipe(
      map((res: any) => {
        return res;
      })
    )
  }

  deleteCar(id:any): Observable<Cars> {
    const url = `${this.url}/${id}`;
    return this.http.delete<Cars>(url, this.httpOptions);
  }

  getEditCar(id: any): Observable<Cars> {
    const url = `${this.url}/${id}`;
    return this.http.get<Cars>(url, this.httpOptions);
  }
 
  editCar(car:CarFetch): Observable<Cars> {
    const url = `${this.url}/${car.id}`;
    return this.http.put<Cars>(url, car, this.httpOptions).pipe(
      map(() => car)
    );
  }
  
}
