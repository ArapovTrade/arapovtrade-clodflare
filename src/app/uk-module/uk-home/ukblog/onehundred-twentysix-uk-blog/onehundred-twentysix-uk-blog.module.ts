import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogOnehundredTwentysixComponent } from './home-uk-blog-onehundred-twentysix/home-uk-blog-onehundred-twentysix.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogOnehundredTwentysixComponent }];

@NgModule({
  declarations: [HomeUkBlogOnehundredTwentysixComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredTwentysixUkBlogModule { }
