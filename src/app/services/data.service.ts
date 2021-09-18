import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Cars } from '../classes/cars';
import { Observable } from 'rxjs';
import { CarFetch } from '../classes/carFetch';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8').set('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9');
  httpOptions = {
    headers: this.headers
  }
  
 
  constructor(private http:HttpClient) { }

  url:string = "http://localhost:3000/Cars";
  getCars() {
    console.log(this.httpOptions)
    return this.http.get<Cars[]>(this.url);
    
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
