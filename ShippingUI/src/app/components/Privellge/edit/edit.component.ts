import { formatPercent } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Employee } from 'src/app/models/Employee';
import { privilege } from 'src/app/models/Privellage';
import { PrivellageService } from 'src/app/services/privellage.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditPrevillageComponent implements OnInit {
  editPrivilegeForm!: FormGroup;
  id!: number;
  privilege!: privilege;
  constructor(
    private route: ActivatedRoute,
    private privilegeservice: PrivellageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.editPrivilegeForm = new FormGroup({
      privellgeName: new FormControl(
        this.privilege?.privellgeName,
        Validators.required
      ),
      date: new FormControl(this.privilege?.date, Validators.required),
    });

    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.privilegeservice
        .getPrivilegeById(this.id)
        .subscribe((data: privilege) => {
          console.log(data);

          this.editPrivilegeForm.setValue({
            privellgeName: data.privellgeName,
            date: data.date,
          });
        });
    });
  }

  onsubmit() {
    this.privilegeservice
      .updatePrivilege(this.id, {
        ...this.editPrivilegeForm.value,
        privellge_Id: this.id,
      })
      .subscribe(
        (data) => {
          alert('update success');
          console.log(data);
          this.router.navigate(['privilege']);
        },
        (error) => {
          alert('error !!!!!!!!');
        }
      );
  }
}
