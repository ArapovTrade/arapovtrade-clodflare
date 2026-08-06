import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogOnehundredSixComponent } from './home-en-blog-onehundred-six/home-en-blog-onehundred-six.component';



import { MatExpansionModule } from '@angular/material/expansion';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogOnehundredSixComponent }];

@NgModule({
  declarations: [HomeEnBlogOnehundredSixComponent],
  imports: [CommonModule, MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredSixEnBlogModule { }
