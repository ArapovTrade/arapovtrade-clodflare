import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogOnehundredFiftyeightComponent } from './home-uk-blog-onehundred-fiftyeight/home-uk-blog-onehundred-fiftyeight.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogOnehundredFiftyeightComponent }];

@NgModule({
  declarations: [HomeUkBlogOnehundredFiftyeightComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredFiftyeightUkBlogModule { }
