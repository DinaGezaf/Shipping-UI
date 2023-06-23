import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PrivellageService } from 'src/app/Core/Services/privellage.service';
import { privilege } from 'src/app/Core/Models/Privellage';

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
