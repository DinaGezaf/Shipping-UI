import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PrivellageService } from './../../../services/privellage.service';
import { Component, OnInit } from '@angular/core';
import { privilege } from 'src/app/models/Privellage';
import { ActivatedRoute, Router } from '@angular/router';

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
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.addPrivilegeForm = new FormGroup({
      privellgeName: new FormControl(null, Validators.required),
      date: new FormControl(null, Validators.required),
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
