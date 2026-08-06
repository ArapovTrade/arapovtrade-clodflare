import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogOnehundredSeventyfiveComponent } from './home-uk-blog-onehundred-seventyfive/home-uk-blog-onehundred-seventyfive.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogOnehundredSeventyfiveComponent }];

@NgModule({
  declarations: [HomeUkBlogOnehundredSeventyfiveComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredSeventyfiveUkBlogModule { }
