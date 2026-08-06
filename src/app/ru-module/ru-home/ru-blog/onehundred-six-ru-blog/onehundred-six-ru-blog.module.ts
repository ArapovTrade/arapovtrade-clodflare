import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogOnehundredSixComponent } from './home-ru-blog-onehundred-six/home-ru-blog-onehundred-six.component';
import { MatExpansionModule } from '@angular/material/expansion';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogOnehundredSixComponent }];

@NgModule({
  declarations: [HomeRuBlogOnehundredSixComponent],
  imports: [CommonModule, MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredSixRuBlogModule { }
