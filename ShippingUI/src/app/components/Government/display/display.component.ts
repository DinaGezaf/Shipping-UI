import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Goverment } from 'src/app/Core/Models/Goverment';
import { CityService } from 'src/app/Core/Services/city.service';
import { GovermentService } from 'src/app/Core/Services/goverment.service';
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
  id!: number;

  selectedGovernment!: number;

  governmentsArray: any;
  allowEdit = false;
  governmentForm!: FormGroup;

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

    this.governmentForm = new FormGroup({
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

  openModal(id: any) {
    if (!id) {
      this.allowEdit = false;
    } else {
      this.allowEdit = true;
      this.getData(id);
      this.id = id;
    }
    this.formModel.show();
  }

  doSomething() {
    this.formModel.hide();
  }
  onsubmit() {}

  onEdit() {
    this.government_service
      .EditGovernment(this.id, {
        ...this.governmentForm.value,
        goverment_Id: this.id,
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
    this.government_service
      .getGovernmentById(id)
      .subscribe((data: Goverment) => {
        this.governmentForm.setValue({
          govermentName: data.govermentName,
          state: data.state,
        });
        console.log(data);
      });
  }
}
