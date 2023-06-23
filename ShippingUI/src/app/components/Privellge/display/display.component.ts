import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { privilege } from 'src/app/Core/Models/Privellage';
import { PrivellageService } from 'src/app/Core/Services/privellage.service';

declare var window: any;
@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css'],
})
export class DisplayPrivellageComponent implements OnInit {
  privileges: privilege[] = [];
  filteredData: privilege[] = [];
  addPrivilegeForm!: FormGroup;
  formModel: any;

  constructor(
    private privellageser: PrivellageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.privellageser.getAllPrivellages().subscribe((data: any) => {
      this.privileges = this.filteredData = data;
      console.log(data);
    });
    this.formModel = new window.bootstrap.Modal(
      document.getElementById('exampleModalCenter')
    );
  }

  addPrivilege() {
    this.router.navigate(['add'], { relativeTo: this.route });
  }

  deletePrivilege(id: number) {
    this.privellageser.deletePrivilege(id).subscribe(
      (data: any) => {
        alert('success delete');
        this.privellageser.getAllPrivellages().subscribe((data: any) => {
          this.privileges = this.filteredData = data;
          console.log(data);
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
      this.deletePrivilege(privellgeid);
    }
  }

  filterData(inputValue: string) {
    const searchTerm = inputValue.toLowerCase().trim();

    return this.privileges.filter((item) => {
      const itemName = item.privellgeName?.toLowerCase();

      return itemName?.startsWith(searchTerm);
    });
  }
  onInputChange(event: any) {
    const inputValue = event.target.value;
    this.filteredData = this.filterData(inputValue);
  }

  // Add
  onsubmit() {
    this.privellageser
      .addPrivilege({
        ...this.addPrivilegeForm.value,
      })
      .subscribe(
        (data) => {
          alert('success add');
          this.router.navigate(['privilege']);
        },
        (error) => {
          alert('error !!!!!');
          console.log(error);
        }
      );
  }

  openModal() {
    this.formModel.show();
  }

  doSomething() {
    this.formModel.hide();
  }
}
