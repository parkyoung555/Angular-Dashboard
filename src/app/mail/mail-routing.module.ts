import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MailComponent} from './pages/mail.component';

const routes: Routes = [
  {
    path: 'mail',
    component: MailComponent,
    data: {
      title: 'Mail',
      icon: 'mail',
      includeInSideNavigation: 1
    }
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
