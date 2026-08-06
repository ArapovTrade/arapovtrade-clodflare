import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogOnehundredElevenComponent } from './home-en-blog-onehundred-eleven/home-en-blog-onehundred-eleven.component';



import { MatExpansionModule } from '@angular/material/expansion';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogOnehundredElevenComponent }];

@NgModule({
  declarations: [HomeEnBlogOnehundredElevenComponent],
   imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredElevenEnBlogModule { }
