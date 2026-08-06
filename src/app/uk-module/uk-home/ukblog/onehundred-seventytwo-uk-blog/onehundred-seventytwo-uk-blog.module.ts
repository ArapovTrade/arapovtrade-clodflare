import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogOnehundredSeventytwoComponent } from './home-uk-blog-onehundred-seventytwo/home-uk-blog-onehundred-seventytwo.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogOnehundredSeventytwoComponent }];

@NgModule({
  declarations: [HomeUkBlogOnehundredSeventytwoComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredSeventytwoUkBlogModule { }
