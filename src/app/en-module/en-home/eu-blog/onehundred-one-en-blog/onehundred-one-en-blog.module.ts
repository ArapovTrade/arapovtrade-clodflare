import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogOnehundredOneComponent } from './home-en-blog-onehundred-one/home-en-blog-onehundred-one.component';
import { MatExpansionModule } from '@angular/material/expansion';


import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogOnehundredOneComponent }];

@NgModule({
  declarations: [HomeEnBlogOnehundredOneComponent],
 imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredOneEnBlogModule { }
