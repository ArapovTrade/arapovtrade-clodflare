import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogOnehundredTwentysevenComponent } from './home-uk-blog-onehundred-twentyseven/home-uk-blog-onehundred-twentyseven.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogOnehundredTwentysevenComponent }];

@NgModule({
  declarations: [HomeUkBlogOnehundredTwentysevenComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredTwentysevenUkBlogModule { }
