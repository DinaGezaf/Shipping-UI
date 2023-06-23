import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Branch } from 'src/app/Core/Models/Branch';
import { Trader } from 'src/app/Core/Models/Trader';
import { BranchService } from 'src/app/Core/Services/branch.service';
import { TraderService } from 'src/app/Core/Services/trader.service';

declare var window: any;

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css'],
})
export class DisplayTraderComponent implements OnInit {
  traders: Trader[] = [];
  filteredData: Trader[] = [];
  Id!: number;
  branchesArray!: Branch[];
  formModel: any;
  traderForm!: FormGroup;
  allowEdit = false;
  traderId!: number;

  constructor(
    private traderservice: TraderService,
    private router: Router,
    private route: ActivatedRoute,
    private branchservice: BranchService
  ) {}

  ngOnInit(): void {
    this.traderservice.GetAllTraders().subscribe((data: any) => {
      this.traders = this.filteredData = data;
      console.log(data);
    });
    this.branchservice.getAllBranches().subscribe((data: any) => {
      this.branchesArray = data;
    });

    this.formModel = new window.bootstrap.Modal(
      document.getElementById('exampleModalCenter')
    );
    this.traderForm = new FormGroup({
      userName: new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(50),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
        ),
      ]),
      address: new FormControl(null, Validators.required),

      phoneNumber: new FormControl(null, [
        Validators.required,
        Validators.pattern(/01[0125][0-9]{8}$/),
      ]),
      costPerRefusedOrder: new FormControl(null, Validators.required),
      companyBranch: new FormControl(null, Validators.required),
    });
  }

  DeleteTrader(id: number) {
    if (confirm('do you want to delete ?')) {
      this.traderservice.DeleteTrader(id).subscribe((data: any) => {
        alert('success deleted');

        this.traderservice.GetAllTraders().subscribe((data: any) => {
          this.traders = this.filteredData = data;
          console.log(data);
        });
      });
    } else {
      this.traderservice.GetAllTraders().subscribe((data: any) => {
        this.traders = this.filteredData = data;
        console.log(data);
      });
    }
  }

  onOptionSelected(event: any) {
    const selectedValue = event.target.value;
    if (selectedValue.startsWith('edit/')) {
      const traderId = selectedValue.substr(5);
      this.openModal(traderId);
      this.allowEdit = true;
    } else {
      this.DeleteTrader(selectedValue);
    }
    event.target.value = 'action';
  }

  filterData(inputValue: string) {
    const searchTerm = inputValue.toLowerCase().trim();

    return this.traders.filter((item) => {
      const itemName = item.userName?.toLowerCase();

      return itemName?.startsWith(searchTerm);
    });
  }
  onInputChange(event: any) {
    const inputValue = event.target.value;
    this.filteredData = this.filterData(inputValue);
  }

  // Add

  onsubmit() {
    this.traderservice.GetAllTraders().subscribe((data: any) => {
      this.traders = this.filteredData = data;
      console.log(data);
    });
    if (!this.allowEdit) {
      this.traderservice.AddTrader(this.traderForm.value).subscribe(
        (data) => {
          console.log(data);
          alert('success add');
          this.router.navigate(['trader']);
        },
        (error) => {
          alert('error !!!!!!');
        }
      );
    } else {
      this.onEdit();
    }
  }

  openModal(id: any) {
    if (!id) {
      this.allowEdit = false;
    } else {
      this.getData(id);
      this.traderId = id;
    }
    this.formModel.show();
  }

  doSomething() {
    this.formModel.hide();
    this.traderForm.reset();
  }

  onEdit() {
    this.traderservice
      .updateTrader(this.traderId, this.traderForm.value)
      .subscribe(
        (data) => {
          console.log(data);
          alert('your data has been updated successfully');
          this.router.navigate(['trader']);
        },
        (error) => {
          alert('error !!! data is not updated');
          console.log(error);
        }
      );
  }

  getData(id: any) {
    this.traderservice.getTraderById(id).subscribe((data: Trader) => {
      console.log(data);
      this.traderForm.setValue({
        userName: data.userName,
        email: data.email,
        password: data.password,
        address: data.address,
        phoneNumber: data.phoneNumber,
        costPerRefusedOrder: data.costPerRefusedOrder,
        companyBranch: data.companyBranch,
      });
    });
  }
}
