import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogOnehundredThirteenComponent } from './home-ru-blog-onehundred-thirteen/home-ru-blog-onehundred-thirteen.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogOnehundredThirteenComponent }];

@NgModule({
  declarations: [HomeRuBlogOnehundredThirteenComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredThirteenRuBlogModule { }
