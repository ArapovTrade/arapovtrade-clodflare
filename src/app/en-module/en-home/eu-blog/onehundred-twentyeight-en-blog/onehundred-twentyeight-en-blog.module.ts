import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogOnehundredTwentyeightComponent } from './home-en-blog-onehundred-twentyeight/home-en-blog-onehundred-twentyeight.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogOnehundredTwentyeightComponent }];

@NgModule({
  declarations: [HomeEnBlogOnehundredTwentyeightComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredTwentyeightEnBlogModule { }
