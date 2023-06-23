import { privilege } from './../../../Core/Models/Privellage';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Employee } from 'src/app/Core/Models/Employee';
import { Branch } from 'src/app/Core/Models/Branch';
import { BranchService } from 'src/app/Core/Services/branch.service';
import { EmployeeService } from 'src/app/Core/Services/employee.service';
import { PrivellageService } from 'src/app/Core/Services/privellage.service';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditEmployeeComponent implements OnInit {
  editEmployeeForm!: FormGroup;

  employeeId!: number;
  employee!: Employee;

  privilegesarray: privilege[] = [];

  branchesArray: Branch[] = [];

  constructor(
    private route: ActivatedRoute,
    private employeeser: EmployeeService,
    private privilegeser: PrivellageService,
    private branchser: BranchService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.editEmployeeForm = new FormGroup({
    //   name: new FormControl(null, [
    //     Validators.required,
    //     Validators.minLength(3),
    //     Validators.maxLength(50),
    //   ]),
    //   userName: new FormControl(null, [
    //     Validators.required,
    //     Validators.minLength(3),
    //     Validators.maxLength(15),
    //   ]),
    //   email: new FormControl(null, [Validators.required, Validators.email]),
    //   password: new FormControl(null, [
    //     Validators.required,
    //     Validators.maxLength(10),
    //     Validators.minLength(6),
    //   ]),
    //   phoneNumber: new FormControl(null, [
    //     Validators.required,
    //     Validators.pattern(/01[0125][0-9]{8}$/),
    //   ]),
    //   privellge_Id: new FormControl(null, Validators.required),
    //   branchid: new FormControl(null, Validators.required),
    // });
    // this.route.params.subscribe((params: Params) => {
    //   this.employeeId = params['id'];
    //   this.employeeser
    //     .getEmployeeById(this.employeeId)
    //     .subscribe((data: Employee) => {
    //       console.log(data);
    //       this.editEmployeeForm.setValue({
    //         name: data.name,
    //         userName: data.userName,
    //         email: data.email,
    //         password: data.password,
    //         phoneNumber: data.phoneNumber,
    //         privellge_Id: data.privellage?.privellge_Id,
    //         branchid: data.branch?.id,
    //       });
    //     });
    // });
    // this.privilegeser.getAllPrivellages().subscribe((data: any) => {
    //   this.privilegesarray = data;
    // });
    // this.branchser.getAllBranches().subscribe((data: any) => {
    //   this.branchesArray = data;
    // });
  }

  onsubmit() {
    console.log(this.editEmployeeForm.value);
    this.employeeser
      .updateEmployee(this.employeeId, {
        ...this.editEmployeeForm.value,
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
}
