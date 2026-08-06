import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogOnehundredElevenComponent } from './home-ru-blog-onehundred-eleven/home-ru-blog-onehundred-eleven.component';




import { MatExpansionModule } from '@angular/material/expansion';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogOnehundredElevenComponent }];

@NgModule({
  declarations: [HomeRuBlogOnehundredElevenComponent],
   imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredElevenRuBlogModule { }
