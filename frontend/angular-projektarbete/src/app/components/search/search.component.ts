import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  // Navigerar till produkt-list-komponenten om en sökning genomförs av användaren,
  // därifrån görs en query mot backenden för produkter som överensstämmer med sökordet.

  doSearch(keyword: string) {
    
    this.router.navigateByUrl('/search/' + keyword);

  }

}
