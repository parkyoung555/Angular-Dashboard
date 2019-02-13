import {Route} from '@angular/router';
import {TrashMailComponent} from './trash-mail.component';

export const trashMailRoute: Route = {
  path: 'trash',
  component: TrashMailComponent,
  data: {
    title: 'Trash',
    icon: 'delete',
    includeInSideNavigation: 3
  }
};
