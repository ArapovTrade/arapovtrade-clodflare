import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogOnehundredSixtyeightComponent } from './home-ru-blog-onehundred-sixtyeight/home-ru-blog-onehundred-sixtyeight.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogOnehundredSixtyeightComponent }];

@NgModule({
  declarations: [HomeRuBlogOnehundredSixtyeightComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredSixtyeightRuBlogModule { }
