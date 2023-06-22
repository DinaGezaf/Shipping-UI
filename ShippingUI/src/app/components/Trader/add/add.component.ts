import { privilege } from './../../../models/Privellage';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Branch } from 'src/app/models/Branch';
import { Trader } from 'src/app/models/Trader';
import { BranchService } from 'src/app/services/branch.service';
import { PrivellageService } from 'src/app/services/privellage.service';
import { TraderService } from 'src/app/services/trader.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddTraderComponent implements OnInit {
  Id!: number;
  branchesArray!: Branch[];

  addTraderForm!: FormGroup;
  constructor(
    private traderser: TraderService,
    private branchser: BranchService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.branchser.getAllBranches().subscribe((data: any) => {
      this.branchesArray = data;
    });

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

  onsubmit() {
    console.log(this.addTraderForm.value);
    this.traderser.AddTrader(this.addTraderForm.value).subscribe(
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
}
