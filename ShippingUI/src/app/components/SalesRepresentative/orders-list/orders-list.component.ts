import { ViewChild, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Order } from 'src/app/Core/Models/Order';
import { OrderService } from 'src/app/Core/Services/order.service';
import { OrderStateFormComponent } from '../order-state-form/order-state-form.component';
import { AuthService } from 'src/app/Core/Services/auth.service';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css'],
})
export class OrdersListComponent implements OnInit {
  displayedColumns: string[] = [
    'orderId',
    'orderDate',
    'customerId',
    'government',
    'city',
    'cost',
    'state',
  ];
  dataSource!: MatTableDataSource<Order>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  selectedState: string | null = '';
  salesEmail: any;

  constructor(
    private orderService: OrderService,
    private dialog: MatDialog,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  selectState(state: string): void {
    this.selectedState = state === 'All' ? '' : state;
    this.loadOrders();
  }

  loadOrders(): void {
    this.salesEmail = this.authService.getEmail();
    this.orderService
      .getAllOrders(this.salesEmail)
      .subscribe((orders: Order[]) => {
        console.log(orders);
        const filteredOrders =
          this.selectedState !== ''
            ? orders.filter((order: any) => order.state === this.selectedState)
            : orders;

        this.dataSource = new MatTableDataSource<Order>(filteredOrders);
        this.dataSource.paginator = this.paginator;
      });
  }

  openOrderStateForm(order: Order): void {
    const dialogRef = this.dialog.open(OrderStateFormComponent, {
      data: order,
    });

    dialogRef.afterClosed().subscribe();
  }
}
