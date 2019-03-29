import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MailComponent} from './pages/mail.component';
import {inboxMailRoute} from './pages/inbox-mail/inbox-mail.route';
import {trashMailRoute} from './pages/trash-mail/trash-mail.route';
import {flaggedMailRoute} from './pages/flagged-mail/flagged-mail.route';

const routes: Routes = [
  {
    path: 'mail',
    component: MailComponent,
    data: {
      navigation: {
        title: 'Mail',
        icon: 'mail',
        showInNavigation: 2,
        displayChildrenAs: 'ACCORDION'
      }
    },
    children: [
      flaggedMailRoute,
      inboxMailRoute,
      trashMailRoute,

      { path: '**', redirectTo: inboxMailRoute.path, pathMatch: 'full' }
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
