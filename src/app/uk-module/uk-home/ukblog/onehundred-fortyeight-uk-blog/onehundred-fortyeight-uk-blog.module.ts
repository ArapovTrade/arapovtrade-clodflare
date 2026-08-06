import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogOnehundredFortyeightComponent } from './home-uk-blog-onehundred-fortyeight/home-uk-blog-onehundred-fortyeight.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogOnehundredFortyeightComponent }];

@NgModule({
  declarations: [HomeUkBlogOnehundredFortyeightComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredFortyeightUkBlogModule { }
