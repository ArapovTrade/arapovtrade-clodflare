import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogOnehundredTwentysixComponent } from './home-ru-blog-onehundred-twentysix/home-ru-blog-onehundred-twentysix.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogOnehundredTwentysixComponent }];

@NgModule({
  declarations: [HomeRuBlogOnehundredTwentysixComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredTwentysixRuBlogModule { }
