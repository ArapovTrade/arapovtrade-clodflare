import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogOnehundredTwentyfiveComponent } from './home-uk-blog-onehundred-twentyfive/home-uk-blog-onehundred-twentyfive.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogOnehundredTwentyfiveComponent }];

@NgModule({
  declarations: [HomeUkBlogOnehundredTwentyfiveComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredTwentyfiveUkBlogModule { }
