import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogOnehundredSeventyeightComponent } from './home-en-blog-onehundred-seventyeight/home-en-blog-onehundred-seventyeight.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogOnehundredSeventyeightComponent }];

@NgModule({
  declarations: [HomeEnBlogOnehundredSeventyeightComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredSeventyeightEnBlogModule { }
