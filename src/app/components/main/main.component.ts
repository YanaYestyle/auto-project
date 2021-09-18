import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Cars } from 'src/app/classes/cars';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CarFetch } from 'src/app/classes/carFetch';


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
  
  create(): void {
    this.cars.push(this.carForm.value);
    this.carForm.reset();
  }

  delete(element: any) {
    this.cars.forEach((value, index) => {
      if(value == element) {
        this.cars.splice(index, 1)
      }
    })
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
