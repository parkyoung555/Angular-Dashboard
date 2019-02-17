import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {NavigationItemModel} from '../../../core/navigation/models/navigation-item.model';
import {AccountService} from '../../services/account.service';

@Component({
  selector: 'app-account-menu',
  templateUrl: './account-menu.component.html',
  styleUrls: ['./account-menu.component.scss']
})
export class AccountMenuComponent implements OnInit {

  name: string;
  menuItems: NavigationItemModel[] = [];
  profileImageUrl: string;

  private username = 'parkyoung555';

  constructor(
    private router: Router,
    private accountService: AccountService
  ) {
    this.profileImageUrl = `https://github.com/identicons/${this.username}.png`;
    this.name = 'Young Park';
  }

  ngOnInit() {
    this.menuItems = this.accountService.getAccountMenuLinksFromRouteConfig(this.router.config);
  }

}
