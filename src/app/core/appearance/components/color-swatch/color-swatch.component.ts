import {Component, Input, OnInit} from '@angular/core';
import {AppTheme} from '../../models/appearance.models';

@Component({
  selector: 'app-color-swatch',
  templateUrl: './color-swatch.component.html',
  styleUrls: ['./color-swatch.component.scss']
})
export class ColorSwatchComponent implements OnInit {

  @Input() theme: AppTheme;
  @Input() selected: boolean;

  constructor() { }

  ngOnInit() {

  }

}
