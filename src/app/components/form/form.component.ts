import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Cars } from 'src/app/classes/cars';
import { CarFetch } from 'src/app/classes/carFetch';
import { DataService } from 'src/app/services/data.service';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  
  

  constructor(public ds:DataService, private router: Router, public route: ActivatedRoute){}

  val: any;
  cars:Cars[] = [];
  car:any = CarFetch;
  ngOnInit(): void {
    let sub = this.route.params.subscribe(params => {
      this.val = params['id']
    });
    this.ds.getEditCar(this.val).subscribe(data => {
      this.car = data;
    })
  }

  /*edit() {
    this.ds.editCar(this.car).subscribe(data => {
      this.car = data;
    });
    this.router.navigate([''])
    this.getCars();
  }*/ 
  edit() {
    this.ds.editCar(this.car).subscribe(data => {
      this.car = data;
    });
    this.getCars();
    this.router.navigate(['/main']);
  }

  getCars() {
    this.ds.getCars().subscribe((responce) => {
      this.cars = responce;
    });
  }

  close() {
    this.router.navigate(['/main']);
  }
 
  /*edit(id: any) {
    this.router.navigate(['/main', id])
  }*/


 
  
}
