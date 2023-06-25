import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { privilege } from 'src/app/Core/Models/Privellage';
import { PrivellageService } from 'src/app/Core/Services/privellage.service';
import Swal from 'sweetalert2';

declare var window: any;
@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css'],
})
export class DisplayPrivellageComponent implements OnInit {
  privileges: privilege[] = [];
  filteredData: privilege[] = [];
  privilegeForm!: FormGroup;
  formModel: any;
  id!: number;

  constructor(
    private privellageser: PrivellageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.privellageser.getAllPrivellages().subscribe((data: any) => {
      this.privileges = this.filteredData = data;
      console.log(data);
    });
    this.formModel = new window.bootstrap.Modal(
      document.getElementById('exampleModalCenter')
    );
    this.privilegeForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      date: new FormControl(null, Validators.required),
    });
  }

  deletePrivilege(id: number) {
    this.privellageser.deletePrivilege(id).subscribe(
      (data: any) => {
        Swal.fire({
          title: 'Deleted successfully!',
          icon: 'success',
          confirmButtonColor: '#00b2ff',
          width: '416px',
        });
        this.privellageser.getAllPrivellages().subscribe((data: any) => {
          this.privileges = this.filteredData = data;
        });
      },
      (error) => {
        alert('error !!!!');
        console.log(error.message);
      }
    );
  }
  onOptionSelected(event: any) {
    const selectedValue = event.target.value;
    if (selectedValue.startsWith('edit/')) {
      const privilegeId = selectedValue.substr(5);
      this.router.navigate([]);
    } else {
      this.deletePrivilege(selectedValue);
    }
    event.target.value = 'action';
  }

  filterData(inputValue: string) {
    const searchTerm = inputValue.toLowerCase().trim();

    return this.privileges.filter((item) => {
      const itemName = item.name?.toLowerCase();

      return itemName?.startsWith(searchTerm);
    });
  }
  onInputChange(event: any) {
    const inputValue = event.target.value;
    this.filteredData = this.filterData(inputValue);
  }

  // Add
  onsubmit() {
    this.privellageser
      .addPrivilege({
        ...this.privilegeForm.value,
      })
      .subscribe(
        (data) => {
          Swal.fire({
            title: 'Form has been successfully submitted!',
            icon: 'success',
            confirmButtonColor: '#00b2ff',
            width: '416px',
          });
          this.formModel.hide();
          this.privellageser.getAllPrivellages().subscribe((data: any) => {
            this.privileges = this.filteredData = data;
          });
        },
        (error) => {
          alert('error !!!!!');
          console.log(error);
        }
      );
  }

  getData(id: any) {
    this.privellageser.getPrivilegeById(id).subscribe((data: privilege) => {
      console.log(data);

      this.privilegeForm.setValue({
        name: data.name,
        date: data.date,
      });
    });
  }

  onEdit() {
    this.privellageser
      .updatePrivilege(this.id, {
        ...this.privilegeForm.value,
        id: this.id,
      })
      .subscribe(
        (data) => {
          Swal.fire({
            title: 'Form has been successfully submitted!',
            icon: 'success',
            confirmButtonColor: '#00b2ff',
          });
          this.formModel.hide();
          this.privellageser.getAllPrivellages().subscribe((data: any) => {
            this.privileges = this.filteredData = data;
          });
        },
        (error) => {
          alert('error !!!!!!!!');
        }
      );
  }
}
