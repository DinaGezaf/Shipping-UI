import { BranchService } from './../../../services/branch.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Branch } from 'src/app/models/Branch';

@Component({
  selector: 'app-display-branch',
  templateUrl: './display-branch.component.html',
  styleUrls: ['./display-branch.component.css'],
})
export class DisplayBranchComponent implements OnInit {
  branches: Branch[] = [];
  filteredData: Branch[] = [];
  constructor(
    private branchService: BranchService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.branchService.getAllBranches().subscribe((data: any) => {
      this.branches = this.filteredData = data;
    });
  }

  addBranch() {
    this.router.navigate(['add'], { relativeTo: this.route });
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
      this.router.navigate(['edit/' + branchid], { relativeTo: this.route });
    } else {
      const branchid = selectedValue;
      this.deleteBranch(branchid);
    }
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
}
