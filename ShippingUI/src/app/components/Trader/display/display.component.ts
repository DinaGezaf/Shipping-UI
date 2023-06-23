import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Branch } from 'src/app/models/Branch';
import { Trader } from 'src/app/models/Trader';
import { BranchService } from 'src/app/services/branch.service';
import { TraderService } from 'src/app/services/trader.service';

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
  addTraderForm!: FormGroup;

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
    this.addTraderForm = new FormGroup({
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

  addTrader() {
    this.router.navigate(['add'], { relativeTo: this.route });
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
      this.router.navigate(['edit/' + traderId], { relativeTo: this.route });
    } else {
      const traderId = selectedValue;
      this.DeleteTrader(traderId);
    }
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
    console.log(this.addTraderForm.value);
    this.traderservice.AddTrader(this.addTraderForm.value).subscribe(
      (data) => {
        console.log(data);
        alert('success add');
        this.router.navigate(['trader']);
      },
      (error) => {
        alert('error !!!!!!');
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
