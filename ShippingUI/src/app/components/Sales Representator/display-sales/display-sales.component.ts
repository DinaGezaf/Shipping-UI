import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Branch } from 'src/app/Core/Models/Branch';
import { Goverment } from 'src/app/Core/Models/Goverment';
import { SalesRepresentator } from 'src/app/Core/Models/Sales';
import { BranchService } from 'src/app/Core/Services/branch.service';
import { GovermentService } from 'src/app/Core/Services/goverment.service';
import { SalesService } from 'src/app/Core/Services/sales.service';

declare var window: any;

@Component({
  selector: 'app-display-sales',
  templateUrl: './display-sales.component.html',
  styleUrls: ['./display-sales.component.css'],
})
export default class DisplaySalesComponent implements OnInit {
  sales: SalesRepresentator[] = [];
  filteredData: SalesRepresentator[] = [];
  branches: Branch[] = [];
  governments: Goverment[] = [];

  durationInSeconds = 5;

  id!: number;

  addSalesForm!: FormGroup;
  formModel: any;

  constructor(
    private salesservice: SalesService,
    private branchservice: BranchService,
    private GovermentService: GovermentService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.salesservice.getAllSales().subscribe((data: any) => {
      this.sales = this.filteredData = data;
    });
    this.formModel = new window.bootstrap.Modal(
      document.getElementById('exampleModalCenter')
    );
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
  addSalesRepresentator() {
    this.router.navigate(['add'], { relativeTo: this.route });
  }

  deleteSales(id: number) {
    this.salesservice.deleteSales(id).subscribe(
      (data: any) => {
        alert('success delete');
        this.salesservice.getAllSales().subscribe((data: any) => {
          this.sales = this.filteredData = data;
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
      const privellgeid = selectedValue.substr(5);
      this.router.navigate(['edit/' + privellgeid], { relativeTo: this.route });
    } else {
      const privellgeid = selectedValue;
      this.deleteSales(privellgeid);
    }
  }

  filterData(inputValue: string) {
    const searchTerm = inputValue.toLowerCase().trim();

    return this.sales.filter((item) => {
      const itemName = item.name?.toLowerCase();

      return itemName?.startsWith(searchTerm);
    });
  }
  onInputChange(event: any) {
    const inputValue = event.target.value;
    this.filteredData = this.filterData(inputValue);
  }

  // Modal

  onsubmit() {
    console.log(this.addSalesForm.value);
    this.salesservice
      .addSalesRepresentator({
        ...this.addSalesForm.value,
        isActive: true,
        discountType: Number(this.addSalesForm.get('discountType')?.value),
      })
      .subscribe(
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
  openModal() {
    this.formModel.show();
  }

  doSomething() {
    this.formModel.hide();
  }
}
