import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogOnehundredSixteenComponent } from './home-uk-blog-onehundred-sixteen/home-uk-blog-onehundred-sixteen.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogOnehundredSixteenComponent }];

@NgModule({
  declarations: [HomeUkBlogOnehundredSixteenComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredSixteenUkBlogModule { }
