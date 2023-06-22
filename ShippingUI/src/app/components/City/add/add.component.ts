import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
  ValidatorFn,
} from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Branch } from 'src/app/models/Branch';
import { BranchService } from 'src/app/services/branch.service';
import { CityService } from 'src/app/services/city.service';
import { GovermentService } from 'src/app/services/goverment.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddCityComponent implements OnInit {
  cityId!: number;
  cityName!: string;
  normalShippingCost!: number;
  pickupShippingCost!: number;

  selectedGovernment!: number;

  governmentsArray: any

  addCityForm!: FormGroup;

  constructor(
    private cityService: CityService,
    private governmentService: GovermentService,

    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.governmentService.GetAllGovernment().subscribe((data: any) => {
      this.governmentsArray = data;
      console.log(this.governmentsArray);
    });



    this.addCityForm = new FormGroup({
      government: new FormControl(null, Validators.required),
      cityName: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      normalShippingCost: new FormControl(null, [
        Validators.required,

      ]),
      pickupShippingCost: new FormControl(null, [
        Validators.required,

      ])
    });
  }

  onsubmit() {
    this.cityService
      .AddCity({
        governmentId: this.selectedGovernment,
        cityName: this.cityName,
        normalShippingCost: this.normalShippingCost,
        pickupShippingCost: this.pickupShippingCost

      })
      .subscribe(
        (data) => {
          console.log(data);
          alert('Your data has been added successfully');
          this.router.navigate(['government']);
        },
        (error) => {
          alert('error !!!!!!');
        }
      );
  }
}

