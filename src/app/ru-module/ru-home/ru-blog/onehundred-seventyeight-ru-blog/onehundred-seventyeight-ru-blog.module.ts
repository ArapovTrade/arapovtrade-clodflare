import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogOnehundredSeventyeightComponent } from './home-ru-blog-onehundred-seventyeight/home-ru-blog-onehundred-seventyeight.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogOnehundredSeventyeightComponent }];

@NgModule({
  declarations: [HomeRuBlogOnehundredSeventyeightComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredSeventyeightRuBlogModule { }
