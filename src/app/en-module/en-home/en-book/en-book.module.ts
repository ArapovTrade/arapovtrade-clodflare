import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnBookPageComponent } from './en-book-page/en-book-page.component';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: EnBookPageComponent,
     
  },
  {
        path: 'osnovy-treydinga',
        loadChildren: () =>
          import('./one-book-en/one-book-en.module').then((m) => m.OneBookEnModule),
      },
      {
        path: 'psihologiya-treydinga',
        loadChildren: () =>
          import('./second-book-en/second-book-en.module').then(
            (m) => m.SecondBookEnModule
          ),
      },
      {
        path: 'osnovy-treydinga-tom-two',
        loadChildren: () =>
          import('./third-book-en/third-book-en.module').then(
            (m) => m.ThirdBookEnModule
          ),
      },
];

@NgModule({
  declarations: [EnBookPageComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class EnBookModule { }
