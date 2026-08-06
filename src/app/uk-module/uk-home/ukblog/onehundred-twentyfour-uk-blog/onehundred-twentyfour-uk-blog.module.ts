import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogOnehundredTwentyfourComponent } from './home-uk-blog-onehundred-twentyfour/home-uk-blog-onehundred-twentyfour.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogOnehundredTwentyfourComponent }];

@NgModule({
  declarations: [HomeUkBlogOnehundredTwentyfourComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredTwentyfourUkBlogModule { }
