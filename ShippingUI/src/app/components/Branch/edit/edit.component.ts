import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Branch } from 'src/app/Core/Models/Branch';
import { BranchService } from 'src/app/Core/Services/branch.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditBranchComponent implements OnInit {
  editBranchForm!: FormGroup;
  id!: number;

  constructor(
    private route: ActivatedRoute,
    private branchservice: BranchService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.editBranchForm = new FormGroup({
      branchName: new FormControl(null, Validators.required),
      createdAt: new FormControl(null, Validators.required),
    });

    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.branchservice.getBranchById(this.id).subscribe((data: Branch) => {
        console.log(data);

        this.editBranchForm.setValue({
          branchName: data.branchName,
          createdAt: data.createdAt,
        });
      });
    });
  }

  onsubmit() {
    this.branchservice
      .updateBranch(this.id, {
        ...this.editBranchForm.value,
        id: this.id,
      })
      .subscribe(
        (data: any) => {
          alert('update success');
          console.log(data);
          this.router.navigate(['branch']);
        },
        (error: any) => {
          alert('error !!!!!!!!');
        }
      );
  }
}
