import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ListingsDocument } from 'src/generated-types';
@Component({
  selector: 'app-create-listing',
  templateUrl: './create-listing.component.html',
  styleUrls: ['./create-listing.component.scss'],
})
export class CreateListingComponent implements OnInit {
  [x: string]: any;
  ListingName = new FormControl('', [Validators.required]);
  apollo: any;
  ADD_LISTING: any;
  listForm: any;


  constructor(private router: Router) { }
  ngOnInit(): void {}

  getListingNameError() {
    if (this.ListingName.hasError('required')) {
      return 'You must enter a value.';
    }
    return '';
  }

  createListing() {
    let tempListId = this.listForm.get('listingId')?.value;
    let tempTitle = this.listForm.get('listingTitle')?.value;
    let tempDesc = this.listForm.get('description')?.value;
    let tempStreet = this.listForm.get('street')?.value;
    let tempCity = this.listForm.get('city')?.value;
    let tempPosCode = this.listForm.get('postalCode')?.value;
    let tempPrice = this.listForm.get('price')?.value;
    this.apollo.mutate({
      mutation: this.ADD_LISTING,
      variables: {
       
        listingId: tempListId,
        listingTitle: tempTitle,
        description: tempDesc,
        street: tempStreet,
        city: tempCity,
        postalCode: tempPosCode,
        price: tempPrice
      },
        },
        {
          refetchQueries: [
            {
              query: ListingsDocument,
            },
          ],
        }
      )
      .subscribe(() => {
        this['dialogRef'].close();
      });
  }
}
