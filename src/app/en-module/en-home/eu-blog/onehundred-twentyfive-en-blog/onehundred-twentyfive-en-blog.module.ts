import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogOnehundredTwentyfiveComponent } from './home-en-blog-onehundred-twentyfive/home-en-blog-onehundred-twentyfive.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogOnehundredTwentyfiveComponent }];

@NgModule({
  declarations: [HomeEnBlogOnehundredTwentyfiveComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredTwentyfiveEnBlogModule { }
