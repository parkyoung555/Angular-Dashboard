import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-setting-row',
  templateUrl: './setting-row.component.html',
  styleUrls: ['./setting-row.component.scss']
})
export class SettingRowComponent implements OnInit {

  @Input() value: any;

  constructor() { }

  ngOnInit() {
  }

}
