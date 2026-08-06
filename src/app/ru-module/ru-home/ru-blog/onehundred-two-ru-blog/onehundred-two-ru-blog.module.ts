import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogOnehundredTwoComponent } from './home-ru-blog-onehundred-two/home-ru-blog-onehundred-two.component';
import { MatExpansionModule } from '@angular/material/expansion';


import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogOnehundredTwoComponent }];

@NgModule({
  declarations: [HomeRuBlogOnehundredTwoComponent],
   imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredTwoRuBlogModule { }
