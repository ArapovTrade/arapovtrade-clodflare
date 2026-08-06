import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogOnehundredTwentyfourComponent } from './home-ru-blog-onehundred-twentyfour/home-ru-blog-onehundred-twentyfour.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogOnehundredTwentyfourComponent }];

@NgModule({
  declarations: [HomeRuBlogOnehundredTwentyfourComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredTwentyfourRuBlogModule { }
