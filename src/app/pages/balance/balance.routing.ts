/**
 * Created by alexa on 03.07.2018.
 */
import { Routes, RouterModule } from '@angular/router';

import { BalanceComponent } from './balance.component';

const routes: Routes = [
  {
    path: '',
    component: BalanceComponent
  }
];

export const routing = RouterModule.forChild(routes);
