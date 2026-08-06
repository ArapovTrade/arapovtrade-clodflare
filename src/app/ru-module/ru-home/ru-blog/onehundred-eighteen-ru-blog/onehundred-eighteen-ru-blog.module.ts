import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogOnehundredEighteenComponent } from './home-ru-blog-onehundred-eighteen/home-ru-blog-onehundred-eighteen.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogOnehundredEighteenComponent }];

@NgModule({
  declarations: [HomeRuBlogOnehundredEighteenComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredEighteenRuBlogModule { }
