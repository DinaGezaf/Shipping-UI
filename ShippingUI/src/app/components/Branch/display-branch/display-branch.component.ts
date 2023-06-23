import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Branch } from 'src/app/Core/Models/Branch';
import { BranchService } from 'src/app/Core/Services/branch.service';

declare var window: any;

@Component({
  selector: 'app-display-branch',
  templateUrl: './display-branch.component.html',
  styleUrls: ['./display-branch.component.css'],
})
export class DisplayBranchComponent implements OnInit {
  branches: Branch[] = [];
  filteredData: Branch[] = [];
  BranchForm!: FormGroup;
  formModel: any;
  allowEdit = false;
  branchId!: number;

  constructor(
    private branchService: BranchService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.branchService.getAllBranches().subscribe((data: any) => {
      this.branches = this.filteredData = data;
    });
    this.BranchForm = new FormGroup({
      branchName: new FormControl(null, Validators.required),
      createdAt: new FormControl(null, Validators.required),
    });
    this.formModel = new window.bootstrap.Modal(
      document.getElementById('exampleModalCenter')
    );
  }

  deleteBranch(id: number) {
    this.branchService.deleteBranch(id).subscribe(
      (data: any) => {
        alert('success delete');

        this.branchService.getAllBranches().subscribe((data: any) => {
          this.branches = this.filteredData = data;
        });
      },
      (error) => {
        alert('error !!!!!');
        console.log(error.message);
      }
    );
  }
  onOptionSelected(event: any) {
    const selectedValue = event.target.value;
    if (selectedValue.startsWith('edit/')) {
      const branchid = selectedValue.substr(5);
      this.openModal(branchid);
      this.allowEdit = true;
    } else {
      const branchid = selectedValue;
      this.deleteBranch(branchid);
    }
    event.target.value = 'action';
  }

  filterData(inputValue: string) {
    const searchTerm = inputValue.toLowerCase().trim();
    return this.branches.filter((item) => {
      const itemName = item.branchName?.toLowerCase();
      return itemName?.startsWith(searchTerm);
    });
  }
  onInputChange(event: any) {
    const inputValue = event.target.value;
    this.filteredData = this.filterData(inputValue);
  }

  changeState(id: number) {
    alert('ghhhhh');
    this.branchService.deleteBranch(id).subscribe(
      (data: any) => {
        alert('success deleted');
      },
      (error) => {
        alert(' error !!!!!!');
        console.log(error.message);
      }
    );
  }

  // Add  Modal

  onsubmit() {
    if (!this.allowEdit) {
      this.branchService
        .addBranch({
          ...this.BranchForm.value,
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
    } else this.onEdit();
    this.branchService.getAllBranches().subscribe((data: any) => {
      this.branches = this.filteredData = data;
    });
  }

  openModal(id: any) {
    if (!id) {
      this.allowEdit = false;
    } else {
      this.getData(id);
      this.branchId = id;
    }
    this.formModel.show();
  }

  doSomething() {
    this.formModel.hide();
    this.BranchForm.reset();
  }

  // Edit
  onEdit() {
    this.branchService
      .updateBranch(this.branchId, {
        ...this.BranchForm.value,
        id: this.branchId,
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

  getData(id: any) {
    this.branchService.getBranchById(id).subscribe((data: Branch) => {
      console.log(data);
      this.BranchForm.setValue({
        branchName: data.branchName,
        createdAt: data.createdAt,
      });
    });
  }
}
