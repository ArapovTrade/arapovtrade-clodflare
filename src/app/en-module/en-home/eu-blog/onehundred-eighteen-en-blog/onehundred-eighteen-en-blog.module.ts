import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogOnehundredEighteenComponent } from './home-en-blog-onehundred-eighteen/home-en-blog-onehundred-eighteen.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogOnehundredEighteenComponent }];

@NgModule({
  declarations: [HomeEnBlogOnehundredEighteenComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredEighteenEnBlogModule { }
