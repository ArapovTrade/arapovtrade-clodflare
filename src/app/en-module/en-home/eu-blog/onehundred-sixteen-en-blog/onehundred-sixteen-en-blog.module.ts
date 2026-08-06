import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogOnehundredSixteenComponent } from './home-en-blog-onehundred-sixteen/home-en-blog-onehundred-sixteen.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogOnehundredSixteenComponent }];

@NgModule({
  declarations: [HomeEnBlogOnehundredSixteenComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredSixteenEnBlogModule { }
