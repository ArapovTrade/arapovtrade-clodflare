import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnHomeComponent } from './en-home/en-home.component';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { HomePageComponent } from './en-home/home-page/home-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DisclaimerenComponent } from './en-home/doc/disclaimeren/disclaimeren.component';
import { PrivacyPolicyUkComponent } from './en-home/doc/privacy-policy-uk/privacy-policy-uk.component';

const routes: Routes = [
  {
    path: '',
    component: EnHomeComponent,
  },
   
     
  {
    path: 'disclaimer',
    component: DisclaimerenComponent,
  },
  {
      path: 'privacy-policy',
      component: PrivacyPolicyUkComponent,
    },
  {
    path: 'studying',
    loadChildren: () =>
      import('./en-home/en-studying/en-studying.module').then(
        (m) => m.EnStudyingModule
      ),
  },
   {
    path: 'books',
    loadChildren: () =>
      import('./en-home/en-book/en-book.module').then((m) => m.EnBookModule),
  },
   
  {
    path: 'freestudying',
    loadChildren: () =>
      import('./en-home/eu-blog/eu-blog.module').then((m) => m.EuBlogModule),
  },
    {
    path: 'main',
    loadChildren: () =>
      import('./en-home/en-crypto/en-crypto.module').then((m) => m.EnCryptoModule),
  },
  // },
];

@NgModule({
  declarations: [EnHomeComponent, HomePageComponent, DisclaimerenComponent, PrivacyPolicyUkComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
})
export class EnModuleModule {}
