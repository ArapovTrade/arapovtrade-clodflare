import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UkHomeComponent } from './uk-home/uk-home.component';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { UkHomePageComponent } from './uk-home/uk-home-page/uk-home-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DisclaimeruaComponent } from './uk-home/doc/disclaimerua/disclaimerua.component';
import { PrivacyPolicyUaComponent } from './uk-home/doc/privacy-policy-ua/privacy-policy-ua.component';

const routes: Routes = [
   
  {
    path: '',
    component: UkHomeComponent,
  },
 
  {
    path: 'disclaimer',
    component: DisclaimeruaComponent,
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyUaComponent,
  },
  {
    path: 'studying',
    loadChildren: () =>
      import('./uk-home/uk-studying/uk-studying.module').then(
        (m) => m.UkStudyingModule
      ),
  },
   
  {
    path: 'freestudying',
    loadChildren: () =>
      import('./uk-home/ukblog/ukblog.module').then((m) => m.UkblogModule),
  },
    {
    path: 'books',
    loadChildren: () =>
      import('./uk-home/uk-book/uk-book.module').then((m) => m.UkBookModule),
  },
];

@NgModule({
  declarations: [UkHomeComponent, UkHomePageComponent, DisclaimeruaComponent, PrivacyPolicyUaComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
})
export class UkModuleModule {}
