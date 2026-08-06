import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogOnehundredThirtyeightComponent } from './home-uk-blog-onehundred-thirtyeight/home-uk-blog-onehundred-thirtyeight.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogOnehundredThirtyeightComponent }];

@NgModule({
  declarations: [HomeUkBlogOnehundredThirtyeightComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredThirtyeightUkBlogModule { }
