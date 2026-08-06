import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogOnehundredEightyeightComponent } from './home-uk-blog-onehundred-eightyeight/home-uk-blog-onehundred-eightyeight.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogOnehundredEightyeightComponent }];

@NgModule({
  declarations: [HomeUkBlogOnehundredEightyeightComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredEightyeightUkBlogModule { }
