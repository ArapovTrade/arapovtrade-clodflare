import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogOnehundredTwentysixComponent } from './home-en-blog-onehundred-twentysix/home-en-blog-onehundred-twentysix.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogOnehundredTwentysixComponent }];

@NgModule({
  declarations: [HomeEnBlogOnehundredTwentysixComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredTwentysixEnBlogModule { }
