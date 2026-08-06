import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UkBookPageComponent } from './uk-book-page/uk-book-page.component';

import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: UkBookPageComponent,
     
  },
  {
        path: 'osnovy-treydinga',
        loadChildren: () =>
          import('./one-book-uk/one-book-uk.module').then((m) => m.OneBookUkModule),
      },
      {
        path: 'psihologiya-treydinga',
        loadChildren: () =>
          import('./second-book-uk/second-book-uk.module').then(
            (m) => m.SecondBookUkModule
          ),
      },
      {
        path: 'osnovy-treydinga-tom-two',
        loadChildren: () =>
          import('./third-book-uk/third-book-uk.module').then(
            (m) => m.ThirdBookUkModule
          ),
      },
];

@NgModule({
  declarations: [UkBookPageComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class UkBookModule { }
