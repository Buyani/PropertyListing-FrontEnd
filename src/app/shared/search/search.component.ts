import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Search } from 'src/app/models/search.mode.';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchForm:FormGroup;
  search:Search;
  @Output() orderByEvent:EventEmitter<String>=new EventEmitter<String>();
  @Output() searchEvent:EventEmitter<Search>=new EventEmitter<Search>();
  @ViewChild('searchRef') usernameElementRef:ElementRef;

  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    this.createSearchForm();
  }

  createSearchForm(){
    this.searchForm=this.fb.group({
      province:[''],
      city:[''],
      minPrice:[''],
      maxPrice:[''],
      keyWord:['']
    })

  }

  //on selected orderby option
  onOrderBy(value:any):void{
    this.orderByEvent.emit(value.target.value)
  }

  //when search button is clicked
  searchKeyWord():void{
    const search={ ...this.search, ...this.searchForm.value}
    this.searchEvent.emit(search);
  }

}
