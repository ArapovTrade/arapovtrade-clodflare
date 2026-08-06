import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogOnehundredTenComponent } from './home-uk-blog-onehundred-ten/home-uk-blog-onehundred-ten.component';



import { MatExpansionModule } from '@angular/material/expansion';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogOnehundredTenComponent }];

@NgModule({
  declarations: [HomeUkBlogOnehundredTenComponent],
  imports: [CommonModule, MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredTenUkBlogModule { }
