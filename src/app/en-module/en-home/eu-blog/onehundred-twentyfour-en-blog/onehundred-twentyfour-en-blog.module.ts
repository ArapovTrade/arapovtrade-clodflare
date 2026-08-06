import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogOnehundredTwentyfourComponent } from './home-en-blog-onehundred-twentyfour/home-en-blog-onehundred-twentyfour.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogOnehundredTwentyfourComponent }];

@NgModule({
  declarations: [HomeEnBlogOnehundredTwentyfourComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredTwentyfourEnBlogModule { }
