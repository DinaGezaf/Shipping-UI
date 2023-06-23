import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Order, OrderState } from 'src/app/Core/Models/Order';
import { OrderService } from 'src/app/Core/Services/order.service';

@Component({
  selector: 'app-order-state-form',
  templateUrl: './order-state-form.component.html',
  styleUrls: ['./order-state-form.component.css'],
})
export class OrderStateFormComponent implements OnInit {
  orderStates: string[] = [];
  selectedState: OrderState | undefined;
  selectedStateKey: string | undefined;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Order,
    private dialogRef: MatDialogRef<OrderStateFormComponent>,
    private orderService: OrderService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.orderStates = Object.keys(OrderState).filter((key) =>
      isNaN(Number(key))
    );
    this.selectedState = this.data.state as OrderState;
  }

  cancel(): void {
    this.dialogRef.close();
  }

  ChangeState(): void {
    const updatedOrder: Order = { ...this.data };

    updatedOrder.state = this.selectedState as number;
    console.log(updatedOrder.state);

    this.orderService
      .updateOrder(updatedOrder.orderId, updatedOrder)
      .subscribe(this.Message());
    this.dialogRef.close();
    console.log(updatedOrder);
  }

  Message() {
    const config = new MatSnackBarConfig();
    config.duration = 5000;
    config.verticalPosition = 'top';
    config.panelClass = ['text-center', 'bg-info', 'text-light'];
    this.snackBar.open('Order State Changed successfully!', '', config);
  }
}
