import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogOnehundredEightytwoComponent } from './home-en-blog-onehundred-eightytwo/home-en-blog-onehundred-eightytwo.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogOnehundredEightytwoComponent }];

@NgModule({
  declarations: [HomeEnBlogOnehundredEightytwoComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredEightytwoEnBlogModule { }
