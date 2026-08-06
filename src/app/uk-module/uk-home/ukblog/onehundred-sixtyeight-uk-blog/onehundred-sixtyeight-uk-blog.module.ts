import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogOnehundredSixtyeightComponent } from './home-uk-blog-onehundred-sixtyeight/home-uk-blog-onehundred-sixtyeight.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogOnehundredSixtyeightComponent }];

@NgModule({
  declarations: [HomeUkBlogOnehundredSixtyeightComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredSixtyeightUkBlogModule { }
