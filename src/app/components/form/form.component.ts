import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Cars } from 'src/app/classes/cars';
import { CarFetch } from 'src/app/classes/carFetch';
import { DataService } from 'src/app/services/data.service';



@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  
  

  constructor(public ds:DataService, private router: Router, public route: ActivatedRoute){}

  val: any;
  cars:Cars[] = [];
  car:any = CarFetch
  ngOnInit(): void {
    let sub = this.route.params.subscribe(params => {
      this.val = params['id']
      console.log(this.val)
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
  /*edit() {
    this.ds.editCar(this.car).subscribe(data => {
      this.car = data;
    });
    this.router.navigate(['main']);
    this.getCars();
  }*/

  getCars() {
    this.ds.getCars().subscribe((responce) => {
      this.cars = responce;
    });
  }
 
  edit(id: any) {
    this.router.navigate(['/form, id'])
  }


 
  
}
