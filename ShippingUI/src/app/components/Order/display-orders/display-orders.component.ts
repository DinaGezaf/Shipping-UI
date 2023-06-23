import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { OrderService } from 'src/app/Core/Services/order.service';
import { OrderStateFormComponent } from '../../SalesRepresentative/order-state-form/order-state-form.component';
import { AuthService } from 'src/app/Core/Services/auth.service';
import { Order } from 'src/app/Core/Models/Order';

@Component({
  selector: 'app-display-orders',
  templateUrl: './display-orders.component.html',
  styleUrls: ['./display-orders.component.css'],
})
export class DisplayOrdersComponent implements OnInit {
  displayedColumns: string[] = [
    'orderId',
    'orderDate',
    'customerId',
    'government',
    'city',
    'cost',
    'action',
    'state',
  ];
  dataSource!: MatTableDataSource<Order>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  selectedState: string | null = '';
  salesRepresentativeId: any;
  empEmail: any;

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
    this.empEmail = this.authService.getEmail();
    this.orderService
      .getAllOrders(this.empEmail)
      .subscribe((orders: Order[]) => {
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
