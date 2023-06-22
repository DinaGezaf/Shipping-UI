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

  constructor() {}

  ngOnInit(): void {}
}
