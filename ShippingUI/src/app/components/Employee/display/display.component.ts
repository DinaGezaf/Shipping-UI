import { Employee } from './../../../models/Employee';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css'],
})
export class DisplayEmployeeComponent implements OnInit {
  employees: Employee[] = [];
  filteredData: Employee[] = [];

  constructor(
    private Employeeser: EmployeeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.Employeeser.GetAllEmployees().subscribe((data: any) => {
      this.employees = this.filteredData = data;

      console.log(data);
    });
  }

  addEmployee() {
    this.router.navigate(['add'], { relativeTo: this.route });
  }

  changeIsActive(employeeId: number) {
    if (confirm('do you want to delete ?')) {
      this.Employeeser.changeIsActive(employeeId).subscribe((data: any) => {
        console.log('success deleted');
        alert('success deleted');

        this.Employeeser.GetAllEmployees().subscribe((data: any) => {
          this.employees = this.filteredData = data;

          console.log(data);
        });
      });
    } else {
    }
  }

  onOptionSelected(event: any) {
    const selectedValue = event.target.value;
    if (selectedValue.startsWith('edit/')) {
      const employeeId = selectedValue.substr(5);
      this.router.navigate(['edit/' + employeeId], { relativeTo: this.route });
    } else {
      const employeeId = selectedValue;
      this.changeIsActive(employeeId);
    }
  }

  filterData(inputValue: string) {
    const searchTerm = inputValue.toLowerCase().trim();

    return this.employees.filter((item) => {
      const itemName = item.name?.toLowerCase();

      return itemName?.startsWith(searchTerm);
    });
  }
  onInputChange(event: any) {
    const inputValue = event.target.value;
    this.filteredData = this.filterData(inputValue);
  }
}
