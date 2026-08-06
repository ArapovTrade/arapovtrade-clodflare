import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogOnehundredComponent } from './home-ru-blog-onehundred/home-ru-blog-onehundred.component';
import { MatExpansionModule } from '@angular/material/expansion';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogOnehundredComponent }];

@NgModule({
  declarations: [HomeRuBlogOnehundredComponent],
  imports: [CommonModule, MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredRuBlogModule {}
