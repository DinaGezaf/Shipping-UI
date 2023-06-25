import { ViewChild, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
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
  currentPage: number = 1;
  pageSize: number = 10;
  totalItems: number = 0;
  totalPages!: number;
  pages!: number[];
  email: any;
  orders: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  selectedState: string | null = '';
  filteredDataOrder: any;
  role: any;
  constructor(
    private orderService: OrderService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadOrders();
    this.applyPagination();
    this.role = localStorage.getItem('role');
  }

  selectState(e: any): void {
    this.selectedState = e.target.value === 'All' ? '' : e.target.value;
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
          this.orders = this.filteredDataOrder = filteredOrdersByState;
        } else {
          this.orders = this.filteredDataOrder = filteredOrders;
        }

        this.orders.paginator = this.paginator;
      }
    });
  }

  deleteOrder(orderId: number) {
    this.orderService
      .deleteOrderForTrader(orderId)
      .subscribe((response: any) => {
        this.loadOrders();
      });
  }

  filterData(inputValue: string) {
    const searchTerm = inputValue.toLowerCase().trim();

    return this.orders.filter((item: any) => {
      const itemName = item.customer?.goverment.toLowerCase();
      console.log(itemName);
      return itemName?.startsWith(searchTerm);
    });
  }
  onInputChange(event: any) {
    const inputValue = event.target.value;
    console.log(inputValue);
    this.filteredDataOrder = this.filterData(inputValue);
  }

  applyPagination() {
    const filteredOrders = this.selectedState
      ? this.orders.filter((order: any) => order.state === this.selectedState)
      : this.orders;

    this.totalItems = filteredOrders.length;
    this.totalPages = Math.ceil(this.totalItems / this.pageSize);

    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);

    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;

    this.orders = filteredOrders.slice(startIndex, endIndex);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.applyPagination();
    }
  }

  onPageSizeChange() {
    this.currentPage = 1;
    this.applyPagination();
  }

  selectStatePagination(state: string) {
    this.selectedState = state;
    this.currentPage = 1;
    this.applyPagination();
  }
}
