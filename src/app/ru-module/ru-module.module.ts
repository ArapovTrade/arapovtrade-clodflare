import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RuHomeComponent } from './ru-home/ru-home.component';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { RuHomePageComponent } from './ru-home/ru-home-page/ru-home-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DisclaimerComponent } from './ru-home/doc/disclaimer/disclaimer.component';
import { PrivacyPolicyRuComponent } from './ru-home/doc/privacy-policy-ru/privacy-policy-ru.component';

const routes: Routes = [
  {
    path: '',

    component: RuHomeComponent,
  },

  {
    path: 'disclaimer',
    component: DisclaimerComponent,
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyRuComponent,
  },
  {
    path: 'studying',
    loadChildren: () =>
      import('./ru-home/ru-studying/ru-studying.module').then(
        (m) => m.RuStudyingModule,
      ),
  },

  {
    path: 'freestudying',
    loadChildren: () =>
      import('./ru-home/ru-blog/ru-blog.module').then((m) => m.RuBlogModule),
  },
  {
    path: 'main',
    loadChildren: () =>
      import('./ru-home/ru-crypto/ru-crypto.module').then(
        (m) => m.RuCryptoModule,
      ),
  },
  {
    path: 'books',
    loadChildren: () =>
      import('./ru-home/ru-book/ru-book.module').then((m) => m.RuBookModule),
  },
];

@NgModule({
  declarations: [
    RuHomeComponent,
    RuHomePageComponent,
    DisclaimerComponent,
    PrivacyPolicyRuComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
})
export class RuModuleModule {}
