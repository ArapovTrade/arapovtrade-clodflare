import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogOnehundredSeventyComponent } from './home-ru-blog-onehundred-seventy/home-ru-blog-onehundred-seventy.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogOnehundredSeventyComponent }];

@NgModule({
  declarations: [HomeRuBlogOnehundredSeventyComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredSeventyRuBlogModule { }
