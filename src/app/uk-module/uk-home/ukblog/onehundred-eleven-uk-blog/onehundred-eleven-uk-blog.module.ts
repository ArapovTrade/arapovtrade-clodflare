import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogOnehundredElevenComponent } from './home-uk-blog-onehundred-eleven/home-uk-blog-onehundred-eleven.component';



import { MatExpansionModule } from '@angular/material/expansion';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogOnehundredElevenComponent }];

@NgModule({
  declarations: [HomeUkBlogOnehundredElevenComponent],
   imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredElevenUkBlogModule { }
