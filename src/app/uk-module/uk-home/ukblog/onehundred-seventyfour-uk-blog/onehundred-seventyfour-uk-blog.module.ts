import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogOnehundredSeventyfourComponent } from './home-uk-blog-onehundred-seventyfour/home-uk-blog-onehundred-seventyfour.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogOnehundredSeventyfourComponent }];

@NgModule({
  declarations: [HomeUkBlogOnehundredSeventyfourComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredSeventyfourUkBlogModule { }
