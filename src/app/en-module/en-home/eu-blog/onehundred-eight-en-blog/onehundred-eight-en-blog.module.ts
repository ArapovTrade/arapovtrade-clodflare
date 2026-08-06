import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogOnehundredEightComponent } from './home-en-blog-onehundred-eight/home-en-blog-onehundred-eight.component';




import { MatExpansionModule } from '@angular/material/expansion';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogOnehundredEightComponent }];

@NgModule({
  declarations: [HomeEnBlogOnehundredEightComponent],
  imports: [CommonModule, MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredEightEnBlogModule { }
