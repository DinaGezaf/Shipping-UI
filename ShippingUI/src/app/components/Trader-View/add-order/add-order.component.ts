import { Router } from '@angular/router';
import { CityService } from './../../../Core/Services/city.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { PaymentType, ShippingType } from 'src/app/Core/Models/Order';
import { AuthService } from 'src/app/Core/Services/auth.service';
import { BranchService } from 'src/app/Core/Services/branch.service';
import { GovermentService } from 'src/app/Core/Services/goverment.service';
import { OrderService } from 'src/app/Core/Services/order.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css'],
})
export class AddOrderComponent implements OnInit {
  rows: any[] = [];
  orderForm!: FormGroup;
  governments: string = '';
  cities: string[] = [];
  selectedGovernment: string = '';
  selectedCity = false;
  shippingTypes: any[] = [];
  paymentMethods: string[] = [];
  branches: string[] = [];
  email: any;
  productsFormArray: any;
  weightOption = {};

  constructor(
    private cityService: CityService,
    private governmentService: GovermentService,
    private branchService: BranchService,
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.shippingTypes = Object.keys(ShippingType).filter((key) =>
      isNaN(Number(key))
    );
    this.paymentMethods = Object.keys(PaymentType).filter((key) =>
      isNaN(Number(key))
    );
  }

  ngOnInit(): void {
    this.orderForm = new FormGroup({
      villageDeliverd: new FormControl(false),
      shippingType: new FormControl(''),
      paymentType: new FormControl(''),
      branch: new FormControl(''),
      products: new FormArray([]),
      totalcost: new FormControl(''),
      totalweight: new FormControl(''),
      traderPhone: new FormControl(''),
      address: new FormControl(''),
      name: new FormControl(''),
      email: new FormControl(''),
      government: new FormControl(''),
      city: new FormControl({ value: '', disabled: true }),
      village: new FormControl(''),
      phone1: new FormControl(''),
      phone2: new FormControl(''),
    });
    this.weightOption = this.orderService.getWeightOptions();
    console.log(this.weightOption);
    this.getGovernments();
    this.getBranches();
    this.subscribeToProductChanges();
  }

  get products(): FormArray {
    return this.orderForm.get('products') as FormArray;
  }

  AddOrder(): void {
    const formData = this.orderForm.value;
    this.email = this.authService.getEmail();
    console.log(this.email);
    const orderData = {
      paymentMethod: PaymentType[formData.paymentType],
      orderDate: new Date().toISOString(),
      shippingType: ShippingType[formData.shippingType],
      companyBranch: formData.branch,
      weightOption: this.weightOption,
      totalCost: formData.totalcost,
      totalWeight: formData.totalweight,
      deliverToVillageCost: 0,
      deliveredToVillage: formData.villageDeliverd,
      customer: {
        email: formData.email,
        name: formData.name,
        goverment: formData.government,
        city: formData.city,
        village: formData.village,
        phone1: formData.phone1,
        phone2: formData.phone2,
      },
      products: formData.products.map((product: any) => ({
        productName: product.productName,
        weight: product.weight,
        quantity: product.quantity,
        price: product.price,
      })),
    };

    this.orderService
      .addOrder(orderData, this.email)
      .subscribe((response: any) => {
        console.log('API response:', response);
      });

    this.orderForm.reset();
    this.router.navigate(['/order/list/trader']);
  }

  subscribeToProductChanges() {
    const productsFormArray = this.orderForm.get('products') as FormArray;

    productsFormArray.valueChanges.subscribe((products) => {
      let totalcost = 0;
      let totalweight = 0;

      products.forEach((product: any) => {
        const price = parseFloat(product.price);
        const quantity = parseFloat(product.quantity);
        const weight = parseFloat(product.weight);

        if (!isNaN(price) && !isNaN(quantity)) {
          totalcost += price * quantity;
        }

        if (!isNaN(weight) && !isNaN(quantity)) {
          totalweight += weight * quantity;
        }
      });

      this.orderForm.patchValue({
        totalcost: totalcost.toFixed(2),
        totalweight: totalweight.toFixed(2),
      });
    });
  }
  addRow() {
    const productFormGroup = new FormGroup({
      productName: new FormControl(''),
      weight: new FormControl(''),
      quantity: new FormControl(''),
      price: new FormControl(''),
    });
    this.rows.push(productFormGroup);
    this.products.push(productFormGroup);
  }

  deleteRow(index: number): void {
    this.rows.splice(index, 1);
  }

  onGovernmentChange(event: any): void {
    this.selectedGovernment = event.target.value;
    const cityControl = this.orderForm.get('city');

    if (this.selectedGovernment) {
      cityControl?.enable();
    } else {
      cityControl?.disable();
    }
    this.getCities(this.selectedGovernment);
  }

  isCityDisabled(): boolean {
    const governmentControl = this.orderForm.get('government');
    return governmentControl?.value === '';
  }
  onVillageDeliveryToggle(event: any) {
    const isChecked = event.checked;
    this.orderForm.get('villageDeliverd')?.setValue(isChecked);
    console.log(isChecked);
  }
  getGovernments(): void {
    this.governmentService.GetAllGovernment().subscribe((data: any) => {
      this.governments = data.map((item: any) => item.govermentName);
    });
  }

  getCities(government: string) {
    this.cityService
      .getCitiesByGovernment(government)
      .subscribe((data: any) => {
        this.cities = data.map((item: any) => item.cityName);
      });
  }
  getBranches(): void {
    this.branchService.getAllBranches().subscribe((data: any) => {
      this.branches = data.map((item: any) => item.branchName);
    });
  }
  Message() {
    const config = new MatSnackBarConfig();
    config.duration = 5000;
    config.verticalPosition = 'top';
    config.panelClass = ['text-center', 'bg-info', 'text-light'];
    this.snackBar.open('Order added successfully!', '', config);
  }
}
