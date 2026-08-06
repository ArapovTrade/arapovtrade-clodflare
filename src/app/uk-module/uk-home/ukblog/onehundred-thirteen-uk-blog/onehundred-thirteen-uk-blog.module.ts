import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogOnehundredThirteenComponent } from './home-uk-blog-onehundred-thirteen/home-uk-blog-onehundred-thirteen.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogOnehundredThirteenComponent }];

@NgModule({
  declarations: [HomeUkBlogOnehundredThirteenComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredThirteenUkBlogModule { }
