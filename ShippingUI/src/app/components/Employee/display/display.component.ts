import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Branch } from 'src/app/Core/Models/Branch';
import { Employee } from 'src/app/Core/Models/Employee';
import { privilege } from 'src/app/Core/Models/Privellage';
import { BranchService } from 'src/app/Core/Services/branch.service';
import { EmployeeService } from 'src/app/Core/Services/employee.service';
import { PrivellageService } from 'src/app/Core/Services/privellage.service';
import Swal from 'sweetalert2';
declare var window: any;

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css'],
})
export class DisplayEmployeeComponent implements OnInit {
  employees: Employee[] = [];
  filteredData: Employee[] = [];
  formModel: any;
  id!: number;
  allowEdit = false;
  privilegesarray: privilege[] = [];
  branchesArray: Branch[] = [];
  employeeForm!: FormGroup;
  empId!: number;
  selectedOption = 'action';
  backdropElement: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private employeeser: EmployeeService,
    private privilegeser: PrivellageService,
    private branchser: BranchService
  ) {}

  ngOnInit(): void {
    this.employeeser.GetAllEmployees().subscribe((data: any) => {
      this.employees = this.filteredData = data;
    });
    console.log(this.employees);

    this.formModel = new window.bootstrap.Modal(
      document.getElementById('employeeModel')
    );
    this.branchser.getAllBranches().subscribe((data: any) => {
      this.branchesArray = data;
    });
    // this.privilegeser.getAllPrivellages().subscribe((data: any) => {
    //   this.privilegesarray = data;
    // });

    this.employeeForm = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      userName: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.maxLength(10),
        Validators.minLength(6),
      ]),
      phoneNumber: new FormControl(null, [
        Validators.required,
        Validators.pattern(/01[0125][0-9]{8}$/),
      ]),
      // privellge_Id: new FormControl(null, Validators.required),
      branchid: new FormControl(null, Validators.required),
    });
  }

  openModal(id: any) {
    if (!id) {
      this.allowEdit = false;
    } else {
      this.empId = id;
      this.getData(id);
    }
    this.formModel = document.getElementById('employeeModel');
    this.formModel.classList.add('show');
    this.formModel.style.display = 'block';
    document.body.classList.add('modal-open');
    // const backdropElement = document.createElement('div');
    // backdropElement.classList.add('modal-backdrop', 'fade', 'show');
    // document.body.appendChild(backdropElement);
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
        this.formModel = document.getElementById('employeeModel');
        this.formModel.classList.remove('show');
        this.formModel.style.display = 'none';
        document.body.classList.remove('modal-open');
        // this.backdropElement = document.querySelector('.modal-backdrop');
        // document.body.removeChild(this.backdropElement);
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
    this.employeeForm.reset();
  }

  changeIsActive(employeeId: number) {
    if (confirm('do you want to delete ?')) {
      this.employeeser.changeIsActive(employeeId).subscribe((data: any) => {
        console.log('success deleted');
        alert('success deleted');

        this.employeeser.GetAllEmployees().subscribe((data: any) => {
          this.employees = this.filteredData = data;

          console.log(data);
        });
      });
    } else {
    }
  }

  onOptionSelected(event: any) {
    const selectedValue = event.target.value;
    if (selectedValue.startsWith('edit/')) {
      const employeeId = selectedValue.substr(5);
      this.allowEdit = true;
      this.openModal(employeeId);
    } else {
      const employeeId = selectedValue;
      this.changeIsActive(employeeId);
    }
    event.target.value = 'action';
  }

  filterData(inputValue: string) {
    const searchTerm = inputValue.toLowerCase().trim();

    return this.employees.filter((item) => {
      const itemName = item.name?.toLowerCase();

      return itemName?.startsWith(searchTerm);
    });
  }
  onInputChange(event: any) {
    const inputValue = event.target.value;
    this.filteredData = this.filterData(inputValue);
  }

  // Add Employee

  onsubmit() {
    if (!this.allowEdit) {
      this.employeeser
        .AddEmployee({
          ...this.employeeForm.value,
          isActive: true,
        })
        .subscribe(
          (data: any) => {
            Swal.fire({
              title: 'Form has been successfully submitted!',
              icon: 'success',
              width: '416px',
              confirmButtonColor: '#00b2ff',
            });
            this.formModel = document.getElementById('employeeModel');
            this.formModel.classList.remove('show');
            this.formModel.style.display = 'none';
            document.body.classList.remove('modal-open');
            this.backdropElement = document.querySelector('.modal-backdrop');
            document.body.removeChild(this.backdropElement);
          },
          (error) => {
            alert('error !!!!!!');
          }
        );
    } else {
      this.onEdit();
    }
    this.employeeser.GetAllEmployees().subscribe((data: any) => {
      this.employees = this.filteredData = data;
    });
  }

  onEdit() {
    this.employeeser
      .updateEmployee(this.empId, {
        ...this.employeeForm.value,
        isActive: true,
      })
      .subscribe(
        (data: any) => {
          Swal.fire({
            title: 'Form has been successfully submitted!',
            icon: 'success',
            confirmButtonColor: '#00b2ff',
            width: '416px',
          });
          this.formModel = document.getElementById('employeeModel');
          this.formModel.classList.remove('show');
          this.formModel.style.display = 'none';
          document.body.classList.remove('modal-open');
          this.backdropElement = document.querySelector('.modal-backdrop');
          document.body.removeChild(this.backdropElement);
        },
        (error) => {
          alert('error!!!! data is not updated ');
          console.log(error);
        }
      );
  }

  // Edit Employee

  getData(id: any) {
    this.employeeser.getEmployeeById(id).subscribe((data: Employee) => {
      console.log(data);

      this.employeeForm.setValue({
        name: data.name,
        userName: data.userName,
        email: data.email,
        password: data.password,
        phoneNumber: data.phoneNumber,
        // privellge_Id: data.privellage?.privellge_Id,
        branchid: data.branch?.id,
      });
    });
  }
}
