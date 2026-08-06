import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogOnehundredSixtyeightComponent } from './home-en-blog-onehundred-sixtyeight/home-en-blog-onehundred-sixtyeight.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogOnehundredSixtyeightComponent }];

@NgModule({
  declarations: [HomeEnBlogOnehundredSixtyeightComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredSixtyeightEnBlogModule { }
