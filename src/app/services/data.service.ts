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
  
  headers = new HttpHeaders().set('Content-type', 'application/json').set('Accept', 'application/json');
  httpOptions = {
    headers: this.headers
  }
  
 
  constructor(private http:HttpClient) { }

  url:string = "http://localhost:3000/Cars";
  getCars() {

    return this.http.get<Cars[]>(this.url);
  }

  getEditCar(id:any): Observable<Cars> {
    const url = `${this.url}/${id}`;
    console.log(url)
    return this.http.get<Cars>(url, this.httpOptions);
  }
 
  
  editCar(car:CarFetch): Observable<Cars> {
    const url = `${this.url}/${car.id}`;
    return this.http.put<Cars>(url, this.httpOptions).pipe(
      map(() => car)
    );
  }
}
