import { GovermentService } from './../../../services/goverment.service';
import { SalesService } from 'src/app/services/sales.service';
import { Component, OnInit } from '@angular/core';
import { BranchService } from 'src/app/services/branch.service';
import { Route, Router } from '@angular/router';
import { Branch } from 'src/app/models/Branch';
import { Goverment } from 'src/app/models/Goverment';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddSalesComponent implements OnInit {
  branches: Branch[] = [];
  governments: Goverment[] = [];

  durationInSeconds = 5;

  id!: number;

  addSalesForm!: FormGroup;

  constructor(
    private SalesService: SalesService,
    private branchservice: BranchService,
    private GovermentService: GovermentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.branchservice.getAllBranches().subscribe((data: any) => {
      this.branches = data;
    });
    this.GovermentService.GetAllGovernment().subscribe((data: any) => {
      this.governments = data;
    });

    this.addSalesForm = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(50),
      ]),
      userName: new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(50),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
        ),
      ]),
      phoneNumber: new FormControl(null, [
        Validators.required,
        Validators.pattern(/01[0125][0-9]{8}$/),
      ]),
      address: new FormControl(null, Validators.required),
      companyPercentage: new FormControl(null, Validators.required),
      discountType: new FormControl<number>(0, Validators.required),
      governmentsIds: new FormControl(null, Validators.required),
      branchesIds: new FormControl(null, Validators.required),
    });
  }

  onsubmit() {
    console.log(this.addSalesForm.value);
    this.SalesService.addSalesRepresentator({
      ...this.addSalesForm.value,
      isActive: true,
      discountType: Number(this.addSalesForm.get('discountType')?.value),
    }).subscribe(
      (data: any) => {
        alert('success add');
        this.router.navigate(['salesRepresentator']);
      },
      (error) => {
        alert('error !!!');
        console.log(error);
      }
    );
  }

  openSnackBar() {}
}
