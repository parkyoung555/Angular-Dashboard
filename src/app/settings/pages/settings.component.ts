import { Component, OnInit } from '@angular/core';
import {NavigationItemModel} from '../../core/navigation/models/navigation-item.model';
import {ActivatedRoute} from '@angular/router';
import {NavigationService} from '../../core/navigation/services/navigation.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  inlineNavLinks: Array<NavigationItemModel>;

  constructor(
    private route: ActivatedRoute,
    private navigationService: NavigationService
  ) {

  }

  ngOnInit() {
    this.inlineNavLinks = this.navigationService.getChildMenuLinks(this.route.snapshot.url[0].path);
  }
}
