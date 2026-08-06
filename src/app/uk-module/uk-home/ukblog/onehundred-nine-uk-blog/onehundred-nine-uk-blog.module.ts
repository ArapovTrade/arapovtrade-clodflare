import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogOnehundredNineComponent } from './home-uk-blog-onehundred-nine/home-uk-blog-onehundred-nine.component';



import { MatExpansionModule } from '@angular/material/expansion';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogOnehundredNineComponent }];

@NgModule({
  declarations: [HomeUkBlogOnehundredNineComponent],
  imports: [CommonModule, MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredNineUkBlogModule { }
