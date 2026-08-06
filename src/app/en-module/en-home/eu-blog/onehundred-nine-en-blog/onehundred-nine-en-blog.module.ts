import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogOnehundredNineComponent } from './home-en-blog-onehundred-nine/home-en-blog-onehundred-nine.component';



import { MatExpansionModule } from '@angular/material/expansion';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogOnehundredNineComponent }];

@NgModule({
  declarations: [HomeEnBlogOnehundredNineComponent],
  imports: [CommonModule, MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredNineEnBlogModule { }
