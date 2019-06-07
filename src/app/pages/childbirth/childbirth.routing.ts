/**
 * Created by alexa on 28.05.2019.
 */
import { Routes, RouterModule } from '@angular/router';

import { ChildbirthComponent } from './childbirth.component';

const routes: Routes = [
  {
    path: '',
    component: ChildbirthComponent
  }
];

export const routing = RouterModule.forChild(routes);
