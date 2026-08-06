import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogOnehundredSixtytwoComponent } from './home-uk-blog-onehundred-sixtytwo/home-uk-blog-onehundred-sixtytwo.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogOnehundredSixtytwoComponent }];

@NgModule({
  declarations: [HomeUkBlogOnehundredSixtytwoComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredSixtytwoUkBlogModule { }
