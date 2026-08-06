import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogOnehundredTwentyeightComponent } from './home-ru-blog-onehundred-twentyeight/home-ru-blog-onehundred-twentyeight.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogOnehundredTwentyeightComponent }];

@NgModule({
  declarations: [HomeRuBlogOnehundredTwentyeightComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredTwentyeightRuBlogModule { }
