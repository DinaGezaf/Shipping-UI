import { ViewChild, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Order } from 'src/app/Core/Models/Order';
import { OrderService } from 'src/app/Core/Services/order.service';
import { AuthService } from 'src/app/Core/Services/auth.service';
import { AddOrderComponent } from '../add-order/add-order.component';
import { EditOrderComponent } from '../edit-order/edit-order.component';

@Component({
  selector: 'app-order-display-Trader',
  templateUrl: './order-display-Trader.component.html',
  styleUrls: ['./order-display-Trader.component.css'],
})
export class OrderDispalyTraderComponent implements OnInit {
  email: any;
  displayedColumns: string[] = [
    'orderId',
    'orderDate',
    'customerId',
    'government',
    'city',
    'defaultCost',
    'actions',
  ];
  dataSource!: MatTableDataSource<Order>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  selectedState: string | null = '';

  constructor(
    private orderService: OrderService,
    private dialog: MatDialog,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadOrders();
    console.log(this.orderService.getWeightOptions());
  }

  selectState(state: string): void {
    this.selectedState = state === 'All' ? '' : state;
    this.loadOrders();
  }

  loadOrders(): void {
    this.email = this.authService.getEmail();
    this.orderService.getAllOrders(this.email).subscribe((orders: any) => {
      console.log(orders);

      if (orders) {
        const filteredOrders = orders.filter((order: any) => !order.isDeleted);
        if (this.selectedState !== '') {
          const filteredOrdersByState = filteredOrders.filter(
            (order: any) => order.state === this.selectedState
          );
          this.dataSource = new MatTableDataSource<Order>(
            filteredOrdersByState
          );
        } else {
          this.dataSource = new MatTableDataSource<Order>(filteredOrders);
        }

        this.dataSource.paginator = this.paginator;
      }
    });
  }

  EditOrder(order: Order): void {
    const dialogRef = this.dialog.open(EditOrderComponent, {
      data: order.orderId,
      width: '900px',
      maxHeight: '90vh',
    });

    dialogRef.afterClosed().subscribe();
  }
  AddOrder(): void {
    const dialogRef = this.dialog.open(AddOrderComponent, {
      width: '900px',
      maxHeight: '90vh',
    });

    dialogRef.afterClosed().subscribe();
  }

  deleteOrder(orderId: number) {
    this.orderService
      .deleteOrderForTrader(orderId)
      .subscribe((response: any) => {
        this.loadOrders();
      });
  }
}
