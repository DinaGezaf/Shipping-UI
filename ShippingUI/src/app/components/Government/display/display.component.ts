import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Goverment } from 'src/app/models/Goverment';
import { GovermentService } from 'src/app/services/goverment.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CityService } from 'src/app/services/city.service';
declare var window: any;
@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css'],
})
export class DisplayGovernmentComponent implements OnInit {
  government: Goverment[] = [];
  filteredData: Goverment[] = [];
  formModel: any;
  cityId!: number;
  cityName!: string;
  normalShippingCost!: number;
  pickupShippingCost!: number;

  selectedGovernment!: number;

  governmentsArray: any;

  addCityForm!: FormGroup;

  constructor(
    private government_service: GovermentService,
    private cityService: CityService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.government_service.GetAllGovernment().subscribe((data: any) => {
      console.log('data' + data);
      this.government = this.filteredData = data;
    });
    this.formModel = new window.bootstrap.Modal(
      document.getElementById('exampleModalCenter')
    );
    this.government_service.GetAllGovernment().subscribe((data: any) => {
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
      normalShippingCost: new FormControl(null, [Validators.required]),
      pickupShippingCost: new FormControl(null, [Validators.required]),
    });
  }

  changeIsActive(GovermentId: number) {}

  onOptionSelected(event: any) {
    const selectedValue = event.target.value;
    if (selectedValue.startsWith('edit/')) {
      const GovernmentId = selectedValue.substr(5);
      this.router.navigate(['edit/' + GovernmentId], {
        relativeTo: this.route,
      });
    } else {
      const GovernmentId = selectedValue;
      this.changeIsActive(GovernmentId);
    }
  }

  filterData(inputValue: string) {
    const searchTerm = inputValue.toLowerCase().trim();

    return this.government.filter((item) => {
      const itemName = item.govermentName?.toLowerCase();

      return itemName?.startsWith(searchTerm);
    });
  }
  onInputChange(event: any) {
    const inputValue = event.target.value;
    this.filteredData = this.filterData(inputValue);
  }

  openModal() {
    this.formModel.show();
  }

  doSomething() {
    this.formModel.hide();
  }
  onsubmit() {
    this.cityService
      .AddCity({
        governmentId: this.selectedGovernment,
        cityName: this.cityName,
        normalShippingCost: this.normalShippingCost,
        pickupShippingCost: this.pickupShippingCost,
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
