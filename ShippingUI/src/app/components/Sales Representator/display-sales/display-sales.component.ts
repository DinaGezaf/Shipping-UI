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
  allowEdit = false;
  salesId!: number;

  salesForm!: FormGroup;
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

    this.salesForm = new FormGroup({
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
      const salesId = selectedValue.substr(5);
      this.allowEdit = true;
      this.openModal(salesId);
    } else {
      this.deleteSales(selectedValue);
    }
    event.target.value = 'action';
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
    if (!this.allowEdit) {
      this.salesservice
        .addSalesRepresentator({
          ...this.salesForm.value,
          isActive: true,
          discountType: Number(this.salesForm.get('discountType')?.value),
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
    } else {
      this.onEdit();
    }
    this.salesservice.getAllSales().subscribe((data: any) => {
      this.sales = this.filteredData = data;
    });
  }
  openModal(id: any) {
    if (!id) {
      this.allowEdit = false;
    } else {
      this.getData(id);
      this.salesId = id;
    }
    this.formModel.show();
  }

  doSomething() {
    this.formModel.hide();
    this.salesForm.reset();
  }

  // Edit
  onEdit() {
    this.salesservice
      .updateSalesRepresentator(this.salesId, {
        ...this.salesForm.value,
        salesRepresentativeId: this.salesId,
        discountType: Number(this.salesForm.get('discountType')?.value),
      })
      .subscribe(
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

  getData(id: any) {
    this.salesservice.getSalesByID(id).subscribe((data: SalesRepresentator) => {
      console.log(data);

      this.salesForm.setValue({
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
    });
  }
}
