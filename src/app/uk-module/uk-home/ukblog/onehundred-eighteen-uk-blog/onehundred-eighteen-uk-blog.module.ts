import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogOnehundredEighteenComponent } from './home-uk-blog-onehundred-eighteen/home-uk-blog-onehundred-eighteen.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogOnehundredEighteenComponent }];

@NgModule({
  declarations: [HomeUkBlogOnehundredEighteenComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredEighteenUkBlogModule { }
