import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MailComponent} from './pages/mail.component';
import {inboxMailRoute} from './pages/inbox-mail/inbox-mail.route';
import {trashMailRoute} from './pages/trash-mail/trash-mail.route';
import {flaggedMailRoute} from './pages/flagged-mail/flagged-mail.route';
import {RouteNavigationData} from '../core/navigation/models/navigation-item.model';

const routeNavigationData = new RouteNavigationData({
  title: 'Mail',
  icon: 'mail',
  showInNavigation: 2,
  displayChildrenAs: 'ACCORDION'
});

const routes: Routes = [
  {
    path: 'mail',
    component: MailComponent,
    data: {
      navigation: routeNavigationData
    },
    children: [
      flaggedMailRoute,
      inboxMailRoute,
      trashMailRoute
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class MailRoutingModule {}
