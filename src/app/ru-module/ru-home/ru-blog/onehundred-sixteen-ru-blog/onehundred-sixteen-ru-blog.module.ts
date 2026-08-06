import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogOnehundredSixteenComponent } from './home-ru-blog-onehundred-sixteen/home-ru-blog-onehundred-sixteen.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogOnehundredSixteenComponent }];

@NgModule({
  declarations: [HomeRuBlogOnehundredSixteenComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredSixteenRuBlogModule { }
