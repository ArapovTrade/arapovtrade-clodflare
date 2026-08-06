import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogOnehundredTenComponent } from './home-en-blog-onehundred-ten/home-en-blog-onehundred-ten.component';


import { MatExpansionModule } from '@angular/material/expansion';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogOnehundredTenComponent }];

@NgModule({
  declarations: [HomeEnBlogOnehundredTenComponent],
  imports: [CommonModule, MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredTenEnBlogModule { }
