import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PrivellageService } from 'src/app/Core/Services/privellage.service';
import {
  Branch,
  City,
  Employee,
  Government,
  Order,
  Sales,
  Trader,
} from 'src/app/Core/Models/Permission';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddPrivellageComponent implements OnInit {
  addPrivilegeForm!: FormGroup;

  constructor(
    private privilegeservice: PrivellageService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.addPrivilegeForm = this.fb.group({
      privellgeName: ['', Validators.required],

      Government: this.fb.group({
        [Government.Read]: [false, Validators.required],
        [Government.Create]: [false, Validators.required],
        [Government.Update]: [false, Validators.required],
        [Government.Delete]: [false, Validators.required],
      }),

      City: this.fb.group({
        [City.Read]: [false, Validators.required],
        [City.Create]: [false, Validators.required],
        [City.Update]: [false, Validators.required],
        [City.Delete]: [false, Validators.required],
      }),

      Trader: this.fb.group({
        [Trader.Read]: [false, Validators.required],
        [Trader.Create]: [false, Validators.required],
        [Trader.Update]: [false, Validators.required],
        [Trader.Delete]: [false, Validators.required],
      }),

      Employee: this.fb.group({
        [Employee.Read]: [false, Validators.required],
        [Employee.Create]: [false, Validators.required],
        [Employee.Update]: [false, Validators.required],
        [Employee.Delete]: [false, Validators.required],
      }),

      Branch: this.fb.group({
        [Branch.Read]: [false, Validators.required],
        [Branch.Create]: [false, Validators.required],
        [Branch.Update]: [false, Validators.required],
        [Branch.Delete]: [false, Validators.required],
      }),

      Sales: this.fb.group({
        [Sales.Read]: [false, Validators.required],
        [Sales.Create]: [false, Validators.required],
        [Sales.Update]: [false, Validators.required],
        [Sales.Delete]: [false, Validators.required],
      }),

      Order: this.fb.group({
        [Order.Read]: [false, Validators.required],
        [Order.Create]: [false, Validators.required],
        [Order.Update]: [false, Validators.required],
        [Order.Delete]: [false, Validators.required],
      }),
    });
  }

  onsubmit() {
    this.privilegeservice
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
}
