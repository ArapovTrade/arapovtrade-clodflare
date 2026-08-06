import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogOnehundredTwentyComponent } from './home-uk-blog-onehundred-twenty/home-uk-blog-onehundred-twenty.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogOnehundredTwentyComponent }];

@NgModule({
  declarations: [HomeUkBlogOnehundredTwentyComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredTwentyUkBlogModule { }
