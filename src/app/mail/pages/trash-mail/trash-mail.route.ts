import {Route} from '@angular/router';
import {TrashMailComponent} from './trash-mail.component';

export const trashMailRoute: Route = {
  path: 'trash',
  component: TrashMailComponent,
  data: {
    navigation: {
      title: 'Trash',
      icon: 'delete',
      showInNavigation: 3
    }
  }
};
