import {Component, Input, OnInit} from '@angular/core';
import {NavigationItemModel} from '../../models/navigation-item.model';

@Component({
  selector: 'app-top-navigation',
  templateUrl: './top-navigation.component.html',
  styleUrls: ['./top-navigation.component.scss']
})
export class TopNavigationComponent implements OnInit {

  @Input() links: Array<NavigationItemModel>;

  constructor() { }

  ngOnInit() {
  }

}
