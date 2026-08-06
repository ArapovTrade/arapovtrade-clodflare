import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogOnehundredSeventyoneComponent } from './home-uk-blog-onehundred-seventyone/home-uk-blog-onehundred-seventyone.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogOnehundredSeventyoneComponent }];

@NgModule({
  declarations: [HomeUkBlogOnehundredSeventyoneComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredSeventyoneUkBlogModule { }
