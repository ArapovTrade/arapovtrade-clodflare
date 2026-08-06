import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RuBookPageComponent } from './ru-book-page/ru-book-page.component';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: RuBookPageComponent,
     
  },
  {
        path: 'osnovy-treydinga',
        loadChildren: () =>
          import('./one-book/one-book.module').then((m) => m.OneBookModule),
      },
      {
        path: 'psihologiya-treydinga',
        loadChildren: () =>
          import('./second-book/second-book.module').then(
            (m) => m.SecondBookModule
          ),
      },
      {
        path: 'osnovy-treydinga-tom-two',
        loadChildren: () =>
          import('./third-book/third-book.module').then(
            (m) => m.ThirdBookModule
          ),
      },
];

@NgModule({
  declarations: [RuBookPageComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class RuBookModule {}
