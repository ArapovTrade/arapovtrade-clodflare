import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogOnehundredSeventyComponent } from './home-en-blog-onehundred-seventy/home-en-blog-onehundred-seventy.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogOnehundredSeventyComponent }];

@NgModule({
  declarations: [HomeEnBlogOnehundredSeventyComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredSeventyEnBlogModule { }
