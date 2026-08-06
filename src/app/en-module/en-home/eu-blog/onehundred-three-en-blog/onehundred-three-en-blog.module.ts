import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogOnehundredThreeComponent } from './home-en-blog-onehundred-three/home-en-blog-onehundred-three.component';
import { MatExpansionModule } from '@angular/material/expansion';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogOnehundredThreeComponent }];

@NgModule({
  declarations: [HomeEnBlogOnehundredThreeComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredThreeEnBlogModule { }
