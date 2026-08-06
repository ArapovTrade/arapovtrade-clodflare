import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogOnehundredSeventyfiveComponent } from './home-ru-blog-onehundred-seventyfive/home-ru-blog-onehundred-seventyfive.component';


import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogOnehundredSeventyfiveComponent }];

@NgModule({
  declarations: [HomeRuBlogOnehundredSeventyfiveComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredSeventyfiveRuBlogModule { }
