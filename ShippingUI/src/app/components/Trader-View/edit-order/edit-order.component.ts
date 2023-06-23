import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { ShippingType, PaymentType } from 'src/app/Core/Models/Order';
import { AuthService } from 'src/app/Core/Services/auth.service';
import { BranchService } from 'src/app/Core/Services/branch.service';
import { CityService } from 'src/app/Core/Services/city.service';
import { GovermentService } from 'src/app/Core/Services/goverment.service';
import { OrderService } from 'src/app/Core/Services/order.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.css'],
})
export class EditOrderComponent implements OnInit {
  rows: any[] = [];
  orderForm!: FormGroup;
  governments: string = '';
  cities: string[] = [];
  selectedGovernment: string = '';
  selectedCity = false;
  shippingTypes: string[] = [];
  paymentMethods: string[] = [];
  branches: string[] = [];
  email: any;
  products: any;
  productsFormArray: any;
  order: any;
  weightOption: any;

  constructor(
    private cityService: CityService,
    private governmentService: GovermentService,
    private branchService: BranchService,
    private orderService: OrderService,
    private authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any,
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
      shippingType: new FormControl(''),
      paymentMethod: new FormControl(''),
      branch: new FormControl(''),
      products: new FormArray([]),
      totalcost: new FormControl(''),
      totalweight: new FormControl(''),
      name: new FormControl(''),
      email: new FormControl(''),
      government: new FormControl(''),
      city: new FormControl({ value: '', disabled: true }),
      village: new FormControl(''),
      phone1: new FormControl(''),
      phone2: new FormControl(''),
    });

    this.getGovernments();
    this.getBranches();
    this.subscribeToProductChanges();
    this.fetchOrderData();
    this.weightOption = this.orderService.getWeightOptions();
    console.log(this.weightOption);
    this.productsFormArray = this.orderForm.get('products') as FormArray;
  }

  populateFormWithSelectedOrder(order: any): void {
    const products = this.orderForm.get('products') as FormArray;

    order.products.forEach((product: any) => {
      const productFormGroup = new FormGroup({
        productName: new FormControl(product.productName || ''),
        quantity: new FormControl(product.quantity || ''),
        price: new FormControl(product.price || ''),
        weight: new FormControl(product.weight || ''),
      });
      products.push(productFormGroup);
      this.rows.push(productFormGroup);
    });

    this.orderForm.patchValue({
      name: order.customer.name,
      email: order.customer.email,
      government: order.customer.goverment,
      city: order.customer.city,
      village: order?.customer.village,
      phone1: order?.customer.phone1,
      phone2: order?.customer.phone2,
      shippingType: order?.shippingType,
      paymentMethod: order?.paymentMethod,
      branch: order?.companyBranch,
      totalcost: order?.totalCost,
      totalweight: order?.totalWeight,
    });
  }
  UpdateOrder(): void {
    const formData = this.orderForm.value;
    const orderData = {
      paymentMethod: PaymentType[formData.paymentMethod],
      orderDate: new Date().toISOString(),
      shippingType: ShippingType[formData.shippingType],
      companyBranch: formData.branch,
      extraWeightCost: this.weightOption.costPerKG,
      totalCost: formData.totalcost,
      totalWeight: formData.totalweight,
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
        // quantity: product.quantity,
        price: product.price,
      })),
    };
    console.log(orderData);
    this.email = this.authService.getEmail();
    this.orderService
      .updateOrder(this.order.orderId, orderData)
      .subscribe((response: any) => {
        console.log('API response:', response);
        this.orderForm.reset();
      });
  }

  fetchOrderData() {
    this.orderService.getOrderById(this.data).subscribe((order: any) => {
      this.order = order;
      console.log(this.order);
      this.populateFormWithSelectedOrder(this.order);
    });
  }

  addRow() {
    const productFormGroup = new FormGroup({
      productName: new FormControl(''),
      weight: new FormControl(''),
      quantity: new FormControl(''),
      price: new FormControl(''),
    });
    this.productsFormArray.push(productFormGroup);
    this.rows.push(productFormGroup);
  }

  subscribeToProductChanges() {
    const productsFormArray = this.orderForm.get('products') as FormArray;

    productsFormArray.valueChanges.subscribe((products) => {
      let totalcost = 0;
      let totalweight = 0;

      products.forEach((product: any) => {
        const price = parseInt(product.price);
        const quantity = parseInt(product.quantity);
        const weight = parseInt(product.weight);

        if (!isNaN(price) && !isNaN(quantity)) {
          totalcost += price * quantity;
        }

        if (!isNaN(weight) && !isNaN(quantity)) {
          totalweight += weight * quantity;
        }
      });

      this.orderForm.patchValue({
        totalcost: totalcost,
        totalweight: totalweight,
      });
    });
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
    this.snackBar.open('Order updated successfully!', '', config);
  }
}
