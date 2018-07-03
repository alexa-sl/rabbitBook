/**
 * Created by alexa on 29.06.2018.
 */
import { Routes, RouterModule } from '@angular/router';

import { RabbitsComponent } from './rabbits.component';

const routes: Routes = [
  {
    path: '',
    component: RabbitsComponent
  }
];

export const routing = RouterModule.forChild(routes);
