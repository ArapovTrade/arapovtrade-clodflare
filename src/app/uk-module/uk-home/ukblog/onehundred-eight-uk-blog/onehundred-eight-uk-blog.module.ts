import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogOnehundredEightComponent } from './home-uk-blog-onehundred-eight/home-uk-blog-onehundred-eight.component';




import { MatExpansionModule } from '@angular/material/expansion';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogOnehundredEightComponent }];

@NgModule({
  declarations: [HomeUkBlogOnehundredEightComponent],
  imports: [CommonModule, MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredEightUkBlogModule { }
