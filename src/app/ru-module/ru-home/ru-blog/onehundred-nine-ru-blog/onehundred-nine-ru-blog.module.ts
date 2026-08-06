import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogOnehundredNineComponent } from './home-ru-blog-onehundred-nine/home-ru-blog-onehundred-nine.component';



import { MatExpansionModule } from '@angular/material/expansion';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogOnehundredNineComponent }];

@NgModule({
  declarations: [HomeRuBlogOnehundredNineComponent],
  imports: [CommonModule, MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredNineRuBlogModule { }
