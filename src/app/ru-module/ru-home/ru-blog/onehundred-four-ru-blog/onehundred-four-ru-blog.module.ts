import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogOnehundredFourComponent } from './home-ru-blog-onehundred-four/home-ru-blog-onehundred-four.component';

import { MatExpansionModule } from '@angular/material/expansion';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogOnehundredFourComponent }];

@NgModule({
  declarations: [HomeRuBlogOnehundredFourComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredFourRuBlogModule { }
