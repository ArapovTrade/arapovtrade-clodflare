import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogOnehundredTwentyfiveComponent } from './home-ru-blog-onehundred-twentyfive/home-ru-blog-onehundred-twentyfive.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogOnehundredTwentyfiveComponent }];

@NgModule({
  declarations: [HomeRuBlogOnehundredTwentyfiveComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredTwentyfiveRuBlogModule { }
