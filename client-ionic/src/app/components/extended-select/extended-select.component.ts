import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { IonicSelectableComponent } from 'ionic-selectable';

@Component({
  selector: 'app-extended-select',
  templateUrl: './extended-select.component.html',
  styleUrls: ['./extended-select.component.scss'],
})
export class ExtendedSelectComponent implements OnInit {

  @Input() model: any;
  @Output() modelChange = new EventEmitter<any>();

  @Input() items: any[];
  @Input() valueField: string;
  @Input() textField: string;
  @Input() multiple: boolean;
  @Input() placeholder: string;
  @Input() title: string;
  @Input() formatField = 'name';
  @Input() selectedDisplay = '';
  @Input() textColor = '';
  @Input() backgroundColor = '';

  @Output() selected = new EventEmitter<any>();

  private currentValue: any;

  @ViewChild('selectableComponent') selectableComponent: IonicSelectableComponent;

  constructor() { }

  ngOnInit() {
    console.log('Select model:');
    
    console.log(this.model);
    console.log('Select items:');
    
    console.log(this.items);
    console.log(this.valueField);
    console.log(this.textField);
  }

  ngAfterViewChecked() {
    const selectableButton: NodeListOf<HTMLElement> = document.
    querySelectorAll('table ionic-selectable div.ionic-selectable-inner');
    selectableButton.forEach(button => {
      if (this.backgroundColor) {
        button.style.backgroundColor =  this.backgroundColor;
      }
      if (this.textColor) {
        button.style.color = this.textColor;
      }
    });
  }

  formatSelectedValues(values) {
    if (this.selectedDisplay) {
      return this.selectedDisplay;
    } else if (this.multiple) {
      return values.map(value => value[this.formatField]).join(', ');
    } else {
      return values.fullName;
    }
  }

  confirmSelect() {
    this.selectableComponent.confirm();
    this.selectableComponent.close();
    this.selected.emit({value: this.currentValue});
  }

  valueChange(event) {
    this.modelChange.emit(event.value);
    this.currentValue = event.value;
  }

}
