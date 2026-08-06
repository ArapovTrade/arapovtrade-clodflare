import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogOnehundredTwentysevenComponent } from './home-ru-blog-onehundred-twentyseven/home-ru-blog-onehundred-twentyseven.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogOnehundredTwentysevenComponent }];

@NgModule({
  declarations: [HomeRuBlogOnehundredTwentysevenComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredTwentysevenRuBlogModule { }
