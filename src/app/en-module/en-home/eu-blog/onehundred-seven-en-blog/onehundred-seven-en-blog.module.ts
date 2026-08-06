import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogOnehundredSevenComponent } from './home-en-blog-onehundred-seven/home-en-blog-onehundred-seven.component';



import { MatExpansionModule } from '@angular/material/expansion';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogOnehundredSevenComponent }];

@NgModule({
  declarations: [HomeEnBlogOnehundredSevenComponent],
  imports: [CommonModule, MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredSevenEnBlogModule { }
