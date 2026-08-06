import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogOnehundredSeventyfourComponent } from './home-ru-blog-onehundred-seventyfour/home-ru-blog-onehundred-seventyfour.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogOnehundredSeventyfourComponent }];

@NgModule({
  declarations: [HomeRuBlogOnehundredSeventyfourComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredSeventyfourRuBlogModule { }
