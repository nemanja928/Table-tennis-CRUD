import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
})
export class PageHeaderComponent implements OnInit {

  @Input() showBar = true;
  @Input() rootTitle = '';
  @Input() rootLink = '';
  @Input() secondLevelTitle = '';
  @Input() loaded = false;

  @Input() showSearch = false;
  @Input() searchTerm = '';
  @Output() searchTermChange = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {}

  onSearchChange() {
    this.searchTermChange.emit({value: this.searchTerm});
  }

}
