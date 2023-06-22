import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Goverment } from 'src/app/models/Goverment';
import { GovermentService } from 'src/app/services/goverment.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css'],
})
export class DisplayGovernmentComponent implements OnInit {
  government: Goverment[] = [];
  filteredData: Goverment[] = [];

  constructor(
    private government_service: GovermentService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.government_service.GetAllGovernment().subscribe((data: any) => {
      console.log('data' + data);
      this.government = this.filteredData = data;
    });
  }

  changeIsActive(GovermentId: number) { }

  onOptionSelected(event: any) {
    const selectedValue = event.target.value;
    if (selectedValue.startsWith('edit/')) {
      const GovernmentId = selectedValue.substr(5);
      this.router.navigate(['edit/' + GovernmentId], {
        relativeTo: this.route,
      });
    } else {
      const GovernmentId = selectedValue;
      this.changeIsActive(GovernmentId);
    }
  }

  filterData(inputValue: string) {
    const searchTerm = inputValue.toLowerCase().trim();

    return this.government.filter((item) => {
      const itemName = item.govermentName?.toLowerCase();

      return itemName?.startsWith(searchTerm);
    });
  }
  onInputChange(event: any) {
    const inputValue = event.target.value;
    this.filteredData = this.filterData(inputValue);
  }
}
