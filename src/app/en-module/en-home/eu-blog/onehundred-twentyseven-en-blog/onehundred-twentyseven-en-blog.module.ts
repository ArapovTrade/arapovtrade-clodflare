import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogOnehundredTwentysevenComponent } from './home-en-blog-onehundred-twentyseven/home-en-blog-onehundred-twentyseven.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogOnehundredTwentysevenComponent }];

@NgModule({
  declarations: [HomeEnBlogOnehundredTwentysevenComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredTwentysevenEnBlogModule { }
