import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Goverment } from 'src/app/Core/Models/Goverment';
import { CityService } from 'src/app/Core/Services/city.service';
import { GovermentService } from 'src/app/Core/Services/goverment.service';

import Swal from 'sweetalert2';

declare var window: any;
@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css'],
})
export class DisplayGovernmentComponent implements OnInit {
  governments: Goverment[] = [];
  filteredData: Goverment[] = [];
  allowEdit = false;
  formModel: any;
  governmentId!: number;
  governmentForm!: FormGroup;

  constructor(private governmentService: GovermentService) {}
  ngOnInit(): void {
    this.governmentService.GetAllGovernment().subscribe((data: any) => {
      this.governments = this.filteredData = data;
    });
    this.governmentForm = new FormGroup({
      governmentName: new FormControl(null, Validators.required),
      state: new FormControl(null, Validators.required),
    });
    this.formModel = new window.bootstrap.Modal(
      document.getElementById('exampleModalCenter')
    );
  }

  // Add and Edit

  getData(id: any) {
    this.governmentService
      .getGovernmentById(id)
      .subscribe((data: Goverment) => {
        console.log(data);
        this.governmentForm.setValue({
          governmentName: data.govermentName,
          state: data.state,
        });
      });
  }
  onEdit() {
    this.governmentService
      .EditGovernment(this.governmentId, {
        ...this.governmentForm.value,
        GovermentId: this.governmentId,
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

  onsubmit() {
    if (!this.allowEdit) {
      this.governmentService
        .addGovernment({
          ...this.governmentForm.value,
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
  }

  // Modal
  openModal(id: any) {
    if (!id) {
      this.allowEdit = false;
    } else {
      this.getData(id);
      this.allowEdit = true;
      this.governmentId = id;
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
    this.governmentForm.reset();
  }

  // Search
  filterData(inputValue: string) {
    const searchTerm = inputValue.toLowerCase().trim();
    return this.governments.filter((item) => {
      const itemName = item.govermentName?.toLowerCase();
      return itemName?.startsWith(searchTerm);
    });
  }

  onInputChange(event: any) {
    const inputValue = event.target.value;
    this.filteredData = this.filterData(inputValue);
  }
}
