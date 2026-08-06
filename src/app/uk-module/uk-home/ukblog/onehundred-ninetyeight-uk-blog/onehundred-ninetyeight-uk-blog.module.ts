import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogOnehundredNinetyeightComponent } from './home-uk-blog-onehundred-ninetyeight/home-uk-blog-onehundred-ninetyeight.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogOnehundredNinetyeightComponent }];

@NgModule({
  declarations: [HomeUkBlogOnehundredNinetyeightComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredNinetyeightUkBlogModule { }
