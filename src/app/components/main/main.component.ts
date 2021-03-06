import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Cars } from 'src/app/classes/cars';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CarFetch } from 'src/app/classes/carFetch';
import { CarNew } from 'src/app/classes/carNew';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private ds: DataService, private fb:FormBuilder, private router: Router, public route: ActivatedRoute)
 { 
    this.carForm = this.fb.group({
      id: Date.now(),
      brand: ['', Validators.required],
      model: ['', Validators.required],
      year: ['', Validators.required],
    })
  }
  ngOnInit(): void {
    this.ds.getCars().subscribe((responce) => {
      this.cars = responce;
    });
  }
  
  cars:Cars[] = [];
  carForm: FormGroup;
  val: any;
  car: any = CarFetch;
  createCar: CarNew = new CarNew();

  model: any;
  search() {
    if(this.model == "") {
      this.ngOnInit();
    } else {
      this.cars = this.cars.filter(res => {
        return res.model.toLocaleLowerCase().match(this.model.toLocaleLowerCase());
      })
    }
  }


  key = "brand";
  reverse: boolean = false;
  sort(key: any) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  create() {
    this.createCar.id = this.carForm.value.id;
    this.createCar.brand = this.carForm.value.brand;
    this.createCar.model = this.carForm.value.model;
    this.createCar.year = this.carForm.value.year;
    this.ds.create(this.createCar).subscribe((res) => {
      this.carForm.reset();
      this.ds.getCars().subscribe((responce) => {
        this.cars = responce;
      })
    });
  }

  delete(val: any) {
    this.ds.deleteCar(val).subscribe((data) => {
      this.ds.getCars().subscribe((responce) => {
        this.cars = responce;
      })
    });
  }

  edit(id: any) {
    this.router.navigate(['/main', id])
  }
  
  getCars() {
    this.ds.getCars().subscribe((responce) => {
      this.cars = responce;
    });
  }
 
}
