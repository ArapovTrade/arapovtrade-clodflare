import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogOnehundredSevenComponent } from './home-ru-blog-onehundred-seven/home-ru-blog-onehundred-seven.component';



import { MatExpansionModule } from '@angular/material/expansion';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogOnehundredSevenComponent }];

@NgModule({
  declarations: [HomeRuBlogOnehundredSevenComponent],
  imports: [CommonModule, MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredSevenRuBlogModule { }
