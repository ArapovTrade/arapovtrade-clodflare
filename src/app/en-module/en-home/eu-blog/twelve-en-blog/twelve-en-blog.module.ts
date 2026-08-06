import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogTwelveComponent } from './home-en-blog-twelve/home-en-blog-twelve.component';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogTwelveComponent }];

@NgModule({
  declarations: [HomeEnBlogTwelveComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class TwelveEnBlogModule {}
