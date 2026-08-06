import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogOnehundredSeventysevenComponent } from './home-uk-blog-onehundred-seventyseven/home-uk-blog-onehundred-seventyseven.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogOnehundredSeventysevenComponent }];

@NgModule({
  declarations: [HomeUkBlogOnehundredSeventysevenComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredSeventysevenUkBlogModule { }
