import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogOnehundredSeventyfourComponent } from './home-en-blog-onehundred-seventyfour/home-en-blog-onehundred-seventyfour.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogOnehundredSeventyfourComponent }];

@NgModule({
  declarations: [HomeEnBlogOnehundredSeventyfourComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredSeventyfourEnBlogModule { }
