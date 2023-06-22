import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Trader } from 'src/app/models/Trader';
import { TraderService } from 'src/app/services/trader.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddTraderComponent implements OnInit {

Name! : string
Email! : string
Password! : string
IsDeleted : boolean = false
Id! : number
Address! : string
ContactNumber! : number
CompanyBranch! :  string
GovermentName! : string
CityName! : string
CostPerRefusedOrder! : number


  addTraderForm! : FormGroup
  constructor(private traderser : TraderService) { }

  ngOnInit(): void {
    this.addTraderForm = new FormGroup({
      'name' : new FormControl(null , Validators.required) ,
      'userName' : new FormControl(null , [Validators.required , Validators.minLength(3),Validators.maxLength(10)]) ,
        'email' : new FormControl(null , [Validators.required , Validators.email])  ,
        'password': new FormControl(null , [Validators.required ,Validators.maxLength(10) , Validators.minLength(3)]) ,
        'id' : new FormControl(null , [Validators.required]),
        'address':new FormControl(null , Validators.required),
        'contactNumber':new FormControl(null , [Validators.required , Validators.minLength(11) ,Validators.maxLength(11)] ) ,
        'costPerRefusedOrder' : new FormControl(null , Validators.required),
        'companyBranch':new FormControl(null , Validators.required),
        'govermentName':new FormControl(null ,Validators.required) ,
        'cityName' : new FormControl(null ,Validators.required)

    })

  }

  onsubmit(){
  //   let newTrader = new Trader(this.Id
  //     , this.Name
  //     , this.Email
  //     ,this.Address
  //     ,this.Password
  //     ,this.CostPerRefusedOrder
  //     ,this.CompanyBranch
  //     ,this.ContactNumber
  //     , this.IsDeleted
  //     ,this.GovermentName
  //     ,this.CityName)

  //     this.traderser.AddTrader(newTrader)
  }

}
