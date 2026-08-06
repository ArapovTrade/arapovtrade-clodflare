import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogOnehundredSevenComponent } from './home-uk-blog-onehundred-seven/home-uk-blog-onehundred-seven.component';



import { MatExpansionModule } from '@angular/material/expansion';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogOnehundredSevenComponent }];

@NgModule({
  declarations: [HomeUkBlogOnehundredSevenComponent],
  imports: [CommonModule, MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredSevenUkBlogModule { }
