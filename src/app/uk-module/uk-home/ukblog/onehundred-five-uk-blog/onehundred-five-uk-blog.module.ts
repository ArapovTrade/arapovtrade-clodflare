import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogOnehundredFiveComponent } from './home-uk-blog-onehundred-five/home-uk-blog-onehundred-five.component';

import { MatExpansionModule } from '@angular/material/expansion';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogOnehundredFiveComponent }];

@NgModule({
  declarations: [HomeUkBlogOnehundredFiveComponent],
   imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredFiveUkBlogModule { }
