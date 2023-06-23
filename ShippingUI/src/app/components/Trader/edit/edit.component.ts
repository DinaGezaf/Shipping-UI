import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Branch } from 'src/app/Core/Models/Branch';
import { Trader } from 'src/app/Core/Models/Trader';
import { BranchService } from 'src/app/Core/Services/branch.service';
import { PrivellageService } from 'src/app/Core/Services/privellage.service';
import { TraderService } from 'src/app/Core/Services/trader.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditTraderComponent implements OnInit {
  editTraderForm!: FormGroup;
  traderId!: number;
  branchesArray: Branch[] = [];

  constructor(
    private route: ActivatedRoute,
    private traderservice: TraderService,
    private privilegeservice: PrivellageService,
    private branchservice: BranchService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.editTraderForm = new FormGroup({
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

    this.route.params.subscribe((params: Params) => {
      this.traderId = params['id'];
      this.traderservice
        .getTraderById(this.traderId)
        .subscribe((data: Trader) => {
          console.log(data);
          this.editTraderForm.setValue({
            userName: data.userName,
            email: data.email,
            password: data.password,
            address: data.address,
            phoneNumber: data.phoneNumber,
            costPerRefusedOrder: data.costPerRefusedOrder,
            companyBranch: data.companyBranch,
          });
        });
    });

    this.branchservice.getAllBranches().subscribe((data: any) => {
      this.branchesArray = data;
    });
  }

  onsubmit() {
    this.traderservice
      .updateTrader(this.traderId, this.editTraderForm.value)
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
}
