import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Trader } from 'src/app/models/Trader';
import { TraderService } from 'src/app/services/trader.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css'],
})
export class DisplayTraderComponent implements OnInit {
  traders: Trader[] = [];
  filteredData: Trader[] = []


  constructor(
    private traderservice: TraderService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.traderservice.GetAllTraders().subscribe((data) => {
      this.traders = this.filteredData;
      console.log(data);
    });
  }

  addTrader() {
    this.router.navigate(['add'], { relativeTo: this.route });
  }

  changeIsActive(traderId: number) {}

  onOptionSelected(event: any) {
    const selectedValue = event.target.value;
    if (selectedValue.startsWith('edit/')) {
      const traderId = selectedValue.substr(5);
      this.router.navigate(['edit/' + traderId], { relativeTo: this.route });
    } else {
      const traderId = selectedValue;
      this.changeIsActive(traderId);
    }
  }

  filterData(inputValue: string) {
    const searchTerm = inputValue.toLowerCase().trim();

    return this.traders.filter((item) => {
      const itemName = item.traderName?.toLowerCase();

      return itemName?.startsWith(searchTerm);
    });
  }
  onInputChange(event: any) {
    const inputValue = event.target.value;
    this.filteredData = this.filterData(inputValue);
  }
}
