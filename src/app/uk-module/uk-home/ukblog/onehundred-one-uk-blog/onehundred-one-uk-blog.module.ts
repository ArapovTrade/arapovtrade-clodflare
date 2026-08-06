import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogOnehundredOneComponent } from './home-uk-blog-onehundred-one/home-uk-blog-onehundred-one.component';

import { MatExpansionModule } from '@angular/material/expansion';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogOnehundredOneComponent }];

@NgModule({
  declarations: [HomeUkBlogOnehundredOneComponent],
   imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredOneUkBlogModule { }
