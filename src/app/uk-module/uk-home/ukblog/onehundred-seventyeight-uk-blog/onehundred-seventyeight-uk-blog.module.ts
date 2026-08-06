import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogOnehundredSeventyeightComponent } from './home-uk-blog-onehundred-seventyeight/home-uk-blog-onehundred-seventyeight.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogOnehundredSeventyeightComponent }];

@NgModule({
  declarations: [HomeUkBlogOnehundredSeventyeightComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredSeventyeightUkBlogModule { }
