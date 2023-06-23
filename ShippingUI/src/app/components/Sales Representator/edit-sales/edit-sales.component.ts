import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Branch } from 'src/app/Core/Models/Branch';
import { Goverment } from 'src/app/Core/Models/Goverment';
import { SalesRepresentator } from 'src/app/Core/Models/Sales';
import { BranchService } from 'src/app/Core/Services/branch.service';
import { GovermentService } from 'src/app/Core/Services/goverment.service';
import { SalesService } from 'src/app/Core/Services/sales.service';

@Component({
  selector: 'app-edit-sales',
  templateUrl: './edit-sales.component.html',
  styleUrls: ['./edit-sales.component.css'],
})
export class EditSalesComponent implements OnInit {
  branches: Branch[] = [];
  governments: Goverment[] = [];

  id!: number;

  editSalesForm!: FormGroup;

  constructor(
    private SalesService: SalesService,
    private branchservice: BranchService,
    private GovermentService: GovermentService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.editSalesForm = new FormGroup({
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
      discountType: new FormControl(null, Validators.required),
      governmentsIds: new FormControl(null, Validators.required),
      branchesIds: new FormControl(null, Validators.required),
    });

    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.SalesService.getSalesByID(this.id).subscribe(
        (data: SalesRepresentator) => {
          console.log(data);

          this.editSalesForm.setValue({
            name: data.name,
            userName: data.userName,
            email: data.email,
            password: data.password,
            phoneNumber: data.phoneNumber,
            address: data.address,
            companyPercentage: data.companyPercentage,
            discountType: data.discountType?.toString(),
            governmentsIds: data.goverments?.map((item) => {
              return item.goverment_Id;
            }),
            branchesIds: data.branches?.map((item) => {
              return item.id;
            }),
          });
        }
      );
    });

    this.branchservice.getAllBranches().subscribe((data: any) => {
      this.branches = data;
    });
    this.GovermentService.GetAllGovernment().subscribe((data: any) => {
      this.governments = data;
    });
  }

  onsubmit() {
    console.log(this.editSalesForm.value);
    this.SalesService.updateSalesRepresentator(this.id, {
      ...this.editSalesForm.value,
      salesRepresentativeId: this.id,
      discountType: Number(this.editSalesForm.get('discountType')?.value),
    }).subscribe(
      (data: any) => {
        alert('success edit');
        this.router.navigate(['salesRepresentator']);
      },
      (error) => {
        alert('error !!!');
        console.log(error);
      }
    );
  }
}
