import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { CityService } from 'src/app/Core/Services/city.service';
import { City } from 'src/app/Core/Models/City';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditCityComponent implements OnInit {
  public editCityForm!: FormGroup;

  cityId!: number;

  param!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cityService: CityService
  ) {}

  ngOnInit(): void {
    this.editCityForm = new FormGroup({
      cityName: new FormControl(null, Validators.required),

      normalShippingCost: new FormControl(null, [Validators.required]),
      pickupShippingCost: new FormControl(null, [Validators.required]),
    });

    this.route.params.subscribe((params: Params) => {
      this.cityId = params['id'];
      this.cityService.getCityById(this.cityId).subscribe((data: City) => {
        this.editCityForm.setValue({
          cityName: data.cityName,
          pickupShippingCost: data.pickupShippingCost,
          normalShippingCost: data.normalShippingCost,
        });

        console.log(data);
      });
    });

    console.log(this.editCityForm);
  }

  onsubmit(updatedCity: any) {
    //   let EditedCity: City = {}
    //   EditedCity.cityId = this.cityId;
    //   EditedCity.cityName = updatedCity.value.cityName;
    //   EditedCity.normalShippingCost = JSON.parse(updatedCity.value.normalShippingCost);
    //   EditedCity.pickupShippingCost = JSON.parse(updatedCity.value.pickupShippingCost);
    //   EditedCity.governmentId = EditedCity.governmentId;
    //   console.log(EditedCity);
    //   this.cityService.EditCity(this.cityId, EditedCity).subscribe(data => {
    //     console.log(data);
    //     this.router.navigate(['city']);
    //   })
    // }
  }
}
