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
import { Employee } from 'src/app/models/Employee';
import { privilege } from 'src/app/models/Privellage';
import { BranchService } from 'src/app/services/branch.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { PrivellageService } from 'src/app/services/privellage.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddEmployeeComponent implements OnInit {
  id!: number;

  privilegesarray: privilege[] = [];
  branchesArray: Branch[] = [];

  addEmployeeForm!: FormGroup;

  constructor(
    private employeeser: EmployeeService,
    private privilegeser: PrivellageService,
    private branchser: BranchService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.privilegeser.getAllPrivellages().subscribe((data: any) => {
      this.privilegesarray = data;
    });

    this.branchser.getAllBranches().subscribe((data: any) => {
      this.branchesArray = data;
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

  onsubmit() {
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
  }
}
