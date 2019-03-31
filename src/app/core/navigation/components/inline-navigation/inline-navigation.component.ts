import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {NavigationItemModel} from '../../models/navigation-item.model';

@Component({
  selector: 'app-inline-navigation',
  templateUrl: './inline-navigation.component.html',
  styleUrls: ['./inline-navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InlineNavigationComponent implements OnInit {

  @Input() links: Array<NavigationItemModel>;

  constructor() {

  }

  ngOnInit() {

  }

}
