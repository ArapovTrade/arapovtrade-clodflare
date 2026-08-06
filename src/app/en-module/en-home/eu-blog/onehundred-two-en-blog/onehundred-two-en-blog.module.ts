import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogOnehundredTwoComponent } from './home-en-blog-onehundred-two/home-en-blog-onehundred-two.component';
import { MatExpansionModule } from '@angular/material/expansion';


import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogOnehundredTwoComponent }];

@NgModule({
  declarations: [HomeEnBlogOnehundredTwoComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredTwoEnBlogModule { }
