import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogOnehundredFourComponent } from './home-en-blog-onehundred-four/home-en-blog-onehundred-four.component';

import { MatExpansionModule } from '@angular/material/expansion';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogOnehundredFourComponent }];

@NgModule({
  declarations: [HomeEnBlogOnehundredFourComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredFourEnBlogModule { }
