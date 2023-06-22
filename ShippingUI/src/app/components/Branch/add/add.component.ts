import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BranchService } from 'src/app/services/branch.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddBranchComponent implements OnInit {
  addBranchForm!: FormGroup;

  constructor(
    private branchservice: BranchService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.addBranchForm = new FormGroup({
      branchName: new FormControl(null, Validators.required),
      createdAt: new FormControl(null, Validators.required),
    });
  }

  onsubmit() {
    this.branchservice
      .addBranch({
        ...this.addBranchForm.value,
        state: true,
      })
      .subscribe(
        (data: any) => {
          alert('success add');
          this.router.navigate(['branch']);
        },
        (error) => {
          alert('error !!!!!');
          console.log(error);
        }
      );
  }
}
