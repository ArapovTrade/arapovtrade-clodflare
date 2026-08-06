import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogOnehundredOneComponent } from './home-ru-blog-onehundred-one/home-ru-blog-onehundred-one.component';
import { MatExpansionModule } from '@angular/material/expansion';


import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogOnehundredOneComponent }];

@NgModule({
  declarations: [HomeRuBlogOnehundredOneComponent],
   imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredOneRuBlogModule { }
