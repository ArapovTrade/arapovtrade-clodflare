import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogOnehundredTwentytwoComponent } from './home-uk-blog-onehundred-twentytwo/home-uk-blog-onehundred-twentytwo.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogOnehundredTwentytwoComponent }];

@NgModule({
  declarations: [HomeUkBlogOnehundredTwentytwoComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredTwentytwoUkBlogModule { }
