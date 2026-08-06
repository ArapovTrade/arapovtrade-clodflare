import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogOnehundredEightyeightComponent } from './home-en-blog-onehundred-eightyeight/home-en-blog-onehundred-eightyeight.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogOnehundredEightyeightComponent }];

@NgModule({
  declarations: [HomeEnBlogOnehundredEightyeightComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredEightyeightEnBlogModule { }
