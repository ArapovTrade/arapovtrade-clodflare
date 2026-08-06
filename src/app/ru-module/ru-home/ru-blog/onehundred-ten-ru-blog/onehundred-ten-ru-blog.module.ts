import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogOnehundredTenComponent } from './home-ru-blog-onehundred-ten/home-ru-blog-onehundred-ten.component';



import { MatExpansionModule } from '@angular/material/expansion';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogOnehundredTenComponent }];

@NgModule({
  declarations: [HomeRuBlogOnehundredTenComponent],
  imports: [CommonModule, MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredTenRuBlogModule { }
