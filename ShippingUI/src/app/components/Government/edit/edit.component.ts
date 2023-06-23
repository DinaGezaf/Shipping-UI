import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { Goverment } from 'src/app/Core/Models/Goverment';
import { GovermentService } from 'src/app/Core/Services/goverment.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditGovernmentComponent implements OnInit {
  public editGovernmentForm!: FormGroup;

  GovernmentId!: number;
  government: Goverment = {};

  // govermentName!: string
  // state!: boolean

  param!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private governmentService: GovermentService
  ) {}

  ngOnInit(): void {
    this.editGovernmentForm = new FormGroup({
      govermentName: new FormControl(null, Validators.required),

      state: new FormControl(null, [Validators.required]),
    });

    this.route.params.subscribe((params: Params) => {
      this.GovernmentId = params['id'];
      this.governmentService
        .getGovernmentById(this.GovernmentId)
        .subscribe((data: Goverment) => {
          // this.government = data
          this.editGovernmentForm.setValue({
            govermentName: data.govermentName,
            state: data.state,
          });

          console.log(data);
        });
    });

    // this.editGovernmentForm= new FormGroup({
    //   'govermentName' : new FormControl(this.government?.govermentName , Validators.required) ,

    //     'state' : new FormControl(this.government?.state , [Validators.required])  ,

    // });
    console.log(this.editGovernmentForm);
  }

  onsubmit(updatedGovernment: any) {
    let EditedGovernment: Goverment = {};

    EditedGovernment.govermentName = updatedGovernment.value.govermentName;
    EditedGovernment.state = JSON.parse(updatedGovernment.value.state);
    console.log(EditedGovernment);
    this.governmentService
      .EditGovernment(this.GovernmentId, EditedGovernment)
      .subscribe((data) => {
        console.log(data);
        this.router.navigate(['government']);
      });
  }
}
