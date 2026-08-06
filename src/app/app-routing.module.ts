import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MainpageComponent } from './mainpage/mainpage.component';
const routes: Routes = [
 
  { path: '', component: MainpageComponent },
  {
    path: 'uk',
    loadChildren: () =>
      import('./uk-module/uk-module.module').then((m) => m.UkModuleModule),
  },
  {
    path: 'ru',
    loadChildren: () =>
      import('./ru-module/ru-module.module').then((m) => m.RuModuleModule),
  },
  {
    path: 'en',
    loadChildren: () =>
      import('./en-module/en-module.module').then((m) => m.EnModuleModule),
  },

  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
