import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { City as City_1 } from 'src/app/Core/Models/City';
import { City } from 'src/app/Core/Models/Permission';
import { AuthService } from 'src/app/Core/Services/auth.service';
import { CityService } from 'src/app/Core/Services/city.service';
import { GovermentService } from 'src/app/Core/Services/goverment.service';
import Swal from 'sweetalert2';

declare var window: any;

@Component({
  selector: 'app-display-city',
  templateUrl: './display-city.component.html',
  styleUrls: ['./display-city.component.css'],
})
export class DisplayCityComponent {
  cities: City_1[] = [];
  filteredData: City_1[] = [];
  cityForm!: FormGroup;
  formModel: any;
  allowEdit = false;
  cityId!: number;
  governments: any[] = [];
  editPermission = false;
  deletePermission = false;
  createPermission = false;

  constructor(
    private cityService: CityService,
    private GovermentService: GovermentService,
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService
  ) {
    this.editPermission = auth.checkPermission(City.Update);
    this.createPermission = auth.checkPermission(City.Create);
    this.deletePermission = auth.checkPermission(City.Delete);
  }

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
            Swal.fire({
              title: 'Form has been successfully submitted!',
              icon: 'success',
              confirmButtonColor: '#00b2ff',
            });
            this.formModel.hide();
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

  close() {
    Swal.fire({
      title: 'Are you sure you would like to cancel?',
      icon: 'warning',
      iconColor: '#FFC700',
      showCancelButton: true,
      confirmButtonText: 'Yes, cancel it!',
      confirmButtonColor: '#00b2ff',
      cancelButtonText: 'No, return',
      width: '416px',
      cancelButtonColor: '#eff2f5',
    }).then((result) => {
      if (result.value) {
        this.formModel.hide();
      } else {
        Swal.fire({
          title: 'Your form has not been cancelled!.',
          icon: 'error',
          confirmButtonText: 'Ok, got it!',
          confirmButtonColor: '#00b2ff',
          width: '416px',
          iconColor: '#F1416C',
          customClass: {
            icon: 'custom-cancel-icon',
            title: 'custom-content-class',
          },
        });
      }
    });
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
          Swal.fire({
            title: 'Form has been successfully submitted!',
            icon: 'success',
            confirmButtonColor: '#00b2ff',
          });
          this.formModel.hide();
        },
        (error: any) => {
          alert('error !!!!!!!!');
        }
      );
  }

  getData(id: any) {
    this.cityService.getCityById(id).subscribe((data: City_1) => {
      this.cityForm.setValue({
        cityName: data.cityName,
        pickupShippingCost: data.pickupShippingCost,
        normalShippingCost: data.normalShippingCost,
        governmentId: data.govermentName,
      });
    });
  }
}
