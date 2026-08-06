import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogOnehundredThirtysevenComponent } from './home-uk-blog-onehundred-thirtyseven/home-uk-blog-onehundred-thirtyseven.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogOnehundredThirtysevenComponent }];

@NgModule({
  declarations: [HomeUkBlogOnehundredThirtysevenComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredThirtysevenUkBlogModule { }
