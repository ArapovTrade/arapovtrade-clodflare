import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogOnehundredFortyeightComponent } from './home-ru-blog-onehundred-fortyeight/home-ru-blog-onehundred-fortyeight.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogOnehundredFortyeightComponent }];

@NgModule({
  declarations: [HomeRuBlogOnehundredFortyeightComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredFortyeightRuBlogModule { }
