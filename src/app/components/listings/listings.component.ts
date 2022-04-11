import { AfterViewInit, Component } from '@angular/core';

import { gql } from 'apollo-angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-Listings',
  templateUrl: './Listings.component.html',
  styleUrls: ['./Listings.component.scss'],
})
export class ListingsComponent implements AfterViewInit {
  resultsLength = 0;
  isDataNull = false;
  data: Listing[] = [];
  isLoadingResults = true;
  sort: any;
  paginator: any;
  authService: any;
  authenticated: any;
  ListingsGql: any;
  searchForm: any;
  listings: any;
  apollo: any;
  
  constructor( private router: Router) {
    this.authService.getIsAuthenticated().subscribe((res: any) => {
      this.authenticated = res;
    })}
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }
    
    ngOnInit(): void {}

  
    getListings() {
      this.apollo.watchQuery({
        query: this.getListings
      }).valueChanges.subscribe((res: any) => {
        this.listings = res.data.getListings;
        console.log(this.listings);
      })
    }
  
    search() {
      let tempSearch = this.searchForm.get('search')?.value;
      let tempCondition = this.searchForm.get('condition')?.value;
  
      console.log(tempSearch, tempCondition);
  
      if (tempSearch == null || tempCondition == null) {
        alert('Search Error: Please fill in fields');
      } else {
        if (tempCondition == 'name') {
          this.searchName(tempSearch);
        }
        if (tempCondition == 'city') {
          this.searchCity(tempSearch);
        }
        if (tempCondition == 'postalCode') {
          this.searchPostalCode(tempSearch);
        }
      }
    }
  
    searchName(search: any) {
      this.apollo.watchQuery({
        query: gql`
          query Query($name: String!) {
            getListingsByName(name: $name) {
              listing_id
              listing_title
              description
              street
              city
              postal_code
              price
              email
              username
            }
          }
        `, variables: {
          name: search
        }
      })
      .valueChanges.subscribe((result: any) => {
        this.listings = result?.data?.getListingsByName;
      })
    }
  
    searchCity(search: any) {
      this.apollo.watchQuery({
        query: gql`
          query GetListingsByCity($city: String!) {
            getListingsByCity(city: $city) {
              listing_id
              listing_title
              description
              street
              city
              postal_code
              price
              email
              username
            }
          }
        `, variables: {
          city: search
        }
      })
      .valueChanges.subscribe((result: any) => {
        this.listings = result?.data?.getListingsByCity;
      })
    }
  
    searchPostalCode(search: any) {
      this.apollo.watchQuery({
        query: gql`
          query Query($postalCode: String!) {
            getListingsByPosCode(postal_code: $postalCode) {
              listing_id
              listing_title
              description
              street
              city
              postal_code
              price
              email
              username
            }
          }
        `, variables: {
          postalCode: search
        }
      })
      .valueChanges.subscribe((result: any) => {
        this.listings = result?.data?.getListingsByPosCode;
      })
    }
}