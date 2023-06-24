import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { City } from 'src/app/Core/Models/City';
import { CityService } from 'src/app/Core/Services/city.service';
import { GovermentService } from 'src/app/Core/Services/goverment.service';
declare var window: any;

@Component({
  selector: 'app-display-city',
  templateUrl: './display-city.component.html',
  styleUrls: ['./display-city.component.css'],
})
export class DisplayCityComponent {
  cities: City[] = [];
  filteredData: City[] = [];
  cityForm!: FormGroup;
  formModel: any;
  allowEdit = false;
  cityId!: number;
  governments: any[] = [];

  constructor(
    private cityService: CityService,
    private GovermentService: GovermentService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cityService.getAllCities().subscribe((data: any) => {
      this.cities = this.filteredData = data;
    });
    this.cityForm = new FormGroup({
      cityName: new FormControl(null, Validators.required),
      normalShippingCost: new FormControl(null, Validators.required),
      pickupShippingCost: new FormControl(null, Validators.required),
      governmentId: new FormControl(null, Validators.required),
    });
    this.formModel = new window.bootstrap.Modal(
      document.getElementById('exampleModalCenter')
    );
  }

  // onOptionSelected(event: any) {
  //   const selectedValue = event.target.value;
  //   if (selectedValue.startsWith('edit/')) {
  //     const cityId = selectedValue.substr(5);
  //     this.openModal(cityId);
  //     this.allowEdit = true;
  //   } else {
  //     const cityId = selectedValue;
  //     // this.deleteBranch(branchid);
  //   }
  //   event.target.value = 'action';
  // }

  filterData(inputValue: string) {
    const searchTerm = inputValue.toLowerCase().trim();
    return this.cities.filter((item) => {
      const itemName = item.cityName?.toLowerCase();
      return itemName?.startsWith(searchTerm);
    });
  }
  onInputChange(event: any) {
    const inputValue = event.target.value;
    this.filteredData = this.filterData(inputValue);
  }

  // Add  Modal

  onsubmit() {
    if (!this.allowEdit) {
      this.cityService
        .AddCity({
          ...this.cityForm.value,
          state: true,
        })
        .subscribe(
          (data: any) => {
            alert('success add');
            // this.router.navigate(['branch']);
          },
          (error) => {
            alert('error !!!!!');
            console.log(error);
          }
        );
    } else this.onEdit();
    this.cityService.getAllCities().subscribe((data: any) => {
      this.cities = this.filteredData = data;
    });
  }

  openModal(id: any) {
    this.GovermentService.GetAllGovernment().subscribe((data: any) => {
      this.governments = data;
    });

    if (!id) {
      this.allowEdit = false;
    } else {
      this.allowEdit = true;
      this.getData(id);
      this.cityId = id;
    }
    this.formModel.show();
  }

  doSomething() {
    this.formModel.hide();
    this.cityForm.reset();
  }

  // Edit
  onEdit() {
    this.cityService
      .EditCity(this.cityId, {
        ...this.cityForm.value,
        cityId: this.cityId,
      })
      .subscribe(
        (data: any) => {
          alert('update success');
          console.log(data);
        },
        (error: any) => {
          alert('error !!!!!!!!');
        }
      );
  }

  getData(id: any) {
    this.cityService.getCityById(id).subscribe((data: City) => {
      this.cityForm.setValue({
        cityName: data.cityName,
        pickupShippingCost: data.pickupShippingCost,
        normalShippingCost: data.normalShippingCost,
        governmentId: data.govermentName,
      });
    });
  }
}
