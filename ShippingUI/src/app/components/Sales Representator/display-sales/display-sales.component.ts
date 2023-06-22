import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SalesRepresentator } from 'src/app/models/Sales';
import { SalesService } from 'src/app/services/sales.service';

@Component({
  selector: 'app-display-sales',
  templateUrl: './display-sales.component.html',
  styleUrls: ['./display-sales.component.css'],
})
export default class DisplaySalesComponent implements OnInit {
  sales: SalesRepresentator[] = [];
  filteredData: SalesRepresentator[] = [];

  constructor(
    private salesservice: SalesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.salesservice.getAllSales().subscribe((data: any) => {
      this.sales = this.filteredData = data;
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
}
