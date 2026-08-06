import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogOnehundredEightComponent } from './home-ru-blog-onehundred-eight/home-ru-blog-onehundred-eight.component';




import { MatExpansionModule } from '@angular/material/expansion';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogOnehundredEightComponent }];

@NgModule({
  declarations: [HomeRuBlogOnehundredEightComponent],
  imports: [CommonModule, MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredEightRuBlogModule { }
