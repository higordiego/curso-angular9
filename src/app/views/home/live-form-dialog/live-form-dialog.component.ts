import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LiveService} from '../../../shared/service/live.service';
import * as moment from 'moment'

@Component({
  selector: 'app-live-form-dialog',
  templateUrl: './live-form-dialog.component.html',
  styleUrls: ['./live-form-dialog.component.css']
})
export class LiveFormDialogComponent implements OnInit {


  public liveForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private rest: LiveService,
    public dialogRef: MatDialogRef<LiveFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}


  ngOnInit(): void {
    this.liveForm = this.fb.group({
      liveName: ['', [Validators.required]],
      channelName: ['', [Validators.required]],
      liveLink: ['', [Validators.required]],
      liveDate: ['', [Validators.required]],
      liveTime: ['', [Validators.required]]
    });
  }


  public createLive(): void {
    const newDate: moment.Moment = moment.utc(this.liveForm.value.liveDate).local();
    this.liveForm.value.liveDate = newDate.format('YYYY-MM-DD') + 'T' + this.liveForm.value.liveTime;
    this.rest.postLives(this.liveForm.value)
      .subscribe(result => {
        this.dialogRef.close();
        this.liveForm.reset();
      });
  }

  cancel(): void {
    this.dialogRef.close();
    this.liveForm.reset();
  }

}
