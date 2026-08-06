import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogOnehundredSeventyComponent } from './home-uk-blog-onehundred-seventy/home-uk-blog-onehundred-seventy.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogOnehundredSeventyComponent }];

@NgModule({
  declarations: [HomeUkBlogOnehundredSeventyComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredSeventyUkBlogModule { }
