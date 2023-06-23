import { Employee } from './../../../models/Employee';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Branch } from 'src/app/models/Branch';
import { privilege } from 'src/app/models/Privellage';
import { BranchService } from 'src/app/services/branch.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { PrivellageService } from 'src/app/services/privellage.service';

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
  addEmployeeForm!: FormGroup;
  empId!: number;

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

    this.formModel = new window.bootstrap.Modal(
      document.getElementById('exampleModalCenter')
    );
    this.branchser.getAllBranches().subscribe((data: any) => {
      this.branchesArray = data;
    });
    this.privilegeser.getAllPrivellages().subscribe((data: any) => {
      this.privilegesarray = data;
    });

    this.addEmployeeForm = new FormGroup({
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
      privellge_Id: new FormControl(null, Validators.required),
      branchid: new FormControl(null, Validators.required),
    });
  }

  openModal(id: any) {
    if (!id) {
      this.getData(id);
      this.empId = id;
    } else {
      this.allowEdit = true;
    }
    this.formModel.show();
  }

  doSomething() {
    this.formModel.hide();
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
      this.router.navigate(['edit/' + employeeId], { relativeTo: this.route });
    } else {
      const employeeId = selectedValue;
      this.changeIsActive(employeeId);
    }
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
          ...this.addEmployeeForm.value,
          isActive: true,
        })
        .subscribe(
          (data) => {
            console.log(data);
            alert('success add');
            this.router.navigate(['employee']);
          },
          (error) => {
            alert('error !!!!!!');
          }
        );
    } else {
      this.onEdit();
    }
  }

  onEdit() {
    this.employeeser
      .updateEmployee(this.empId, {
        ...this.addEmployeeForm.value,
        isActive: true,
      })
      .subscribe(
        (data) => {
          console.log(data);
          alert('Your data has been updated successfully');
          this.router.navigate(['employee']);
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

      this.addEmployeeForm.setValue({
        name: data.name,
        userName: data.userName,
        email: data.email,
        password: data.password,
        phoneNumber: data.phoneNumber,
        privellge_Id: data.privellage?.privellge_Id,
        branchid: data.branch?.id,
      });
    });
  }
}
