import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogOnehundredEightytwoComponent } from './home-ru-blog-onehundred-eightytwo/home-ru-blog-onehundred-eightytwo.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogOnehundredEightytwoComponent }];

@NgModule({
  declarations: [HomeRuBlogOnehundredEightytwoComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredEightytwoRuBlogModule { }
