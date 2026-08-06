import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogOnehundredEightyeightComponent } from './home-ru-blog-onehundred-eightyeight/home-ru-blog-onehundred-eightyeight.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogOnehundredEightyeightComponent }];

@NgModule({
  declarations: [HomeRuBlogOnehundredEightyeightComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredEightyeightRuBlogModule { }
