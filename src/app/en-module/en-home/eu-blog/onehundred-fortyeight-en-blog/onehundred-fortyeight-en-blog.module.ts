import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogOnehundredFortyeightComponent } from './home-en-blog-onehundred-fortyeight/home-en-blog-onehundred-fortyeight.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogOnehundredFortyeightComponent }];

@NgModule({
  declarations: [HomeEnBlogOnehundredFortyeightComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredFortyeightEnBlogModule { }
