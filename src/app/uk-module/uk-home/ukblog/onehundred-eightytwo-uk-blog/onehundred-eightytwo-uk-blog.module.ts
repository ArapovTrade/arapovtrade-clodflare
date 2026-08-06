import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogOnehundredEightytwoComponent } from './home-uk-blog-onehundred-eightytwo/home-uk-blog-onehundred-eightytwo.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogOnehundredEightytwoComponent }];

@NgModule({
  declarations: [HomeUkBlogOnehundredEightytwoComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredEightytwoUkBlogModule { }
