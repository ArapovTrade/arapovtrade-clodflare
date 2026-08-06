import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogOnehundredThirteenComponent } from './home-en-blog-onehundred-thirteen/home-en-blog-onehundred-thirteen.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogOnehundredThirteenComponent }];

@NgModule({
  declarations: [HomeEnBlogOnehundredThirteenComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredThirteenEnBlogModule { }
