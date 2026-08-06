import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogOnehundredTwelveComponent } from './home-uk-blog-onehundred-twelve/home-uk-blog-onehundred-twelve.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogOnehundredTwelveComponent }];

@NgModule({
  declarations: [HomeUkBlogOnehundredTwelveComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredTwelveUkBlogModule { }
