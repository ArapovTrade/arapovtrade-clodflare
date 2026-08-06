import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogOnehundredSeventyoneComponent } from './home-ru-blog-onehundred-seventyone/home-ru-blog-onehundred-seventyone.component';


import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogOnehundredSeventyoneComponent }];

@NgModule({
  declarations: [HomeRuBlogOnehundredSeventyoneComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredSeventyoneRuBlogModule { }
