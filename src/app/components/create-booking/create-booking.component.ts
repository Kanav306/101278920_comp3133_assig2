import {  Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { BookingInput, GetAvailableListingsDocument } from '../../../generated-types';


@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss'],
})
export class CreateBookingComponent implements OnInit {
  [x: string]: any;
  bookingError: string;
  bookingForm = this['formBuilder'].group({
    listing_id: ['', [Validators.required]],
    booking_end: ['', [Validators.required]],
    booking_start: ['', [Validators.required]],
    booking_date: [new Date(), [Validators.required]],
    booking_id: [Math.floor(Math.random() * 1000), [Validators.required]],
  });

  constructor(private router: Router, private apollo: Apollo,) {
    if (this.router.getCurrentNavigation()?.extras.state) {
      this['list'] = this.router.getCurrentNavigation()?.extras.state?.['list'];
    }
   }

  ngOnInit(): void {}
  get end() {
    return this.bookingForm.get('booking_end');
  }
  get start() {
    return this.bookingForm.get('booking_start');
  }
  get listingId() {
    return this.bookingForm.get('listing_id');
  }
  onSubmit() {
    this.bookingError = '';
    this['createBookingGQL']
      .mutate(
        { data: this.bookingForm.value as BookingInput },
        {
          refetchQueries: [
            {
              query: GetAvailableListingsDocument,
            },
          ],
        }
      )
      .subscribe((res: any) => {
        this.router.navigate(['/history'])
      }, (err: any) => {
        alert(err);
      })
  }
}
