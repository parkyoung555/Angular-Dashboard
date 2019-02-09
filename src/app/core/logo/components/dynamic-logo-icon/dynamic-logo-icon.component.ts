import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-dynamic-logo-icon',
  templateUrl: './dynamic-logo-icon.component.html',
  styleUrls: ['./dynamic-logo-icon.component.scss']
})
export class DynamicLogoIconComponent implements OnInit {

  @Input() brandLetter: string;

  constructor() {

  }

  ngOnInit() {
  }

}
