/**
 * Created by alexa on 05.09.2018.
 */
import { Routes, RouterModule } from '@angular/router';

import { CoupleComponent } from './couple.component';

const routes: Routes = [
  {
    path: '',
    component: CoupleComponent
  }
];

export const routing = RouterModule.forChild(routes);
