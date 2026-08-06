import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogOnehundredTwentyeightComponent } from './home-uk-blog-onehundred-twentyeight/home-uk-blog-onehundred-twentyeight.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogOnehundredTwentyeightComponent }];

@NgModule({
  declarations: [HomeUkBlogOnehundredTwentyeightComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredTwentyeightUkBlogModule { }
