import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogOnehundredSixtytwoComponent } from './home-ru-blog-onehundred-sixtytwo/home-ru-blog-onehundred-sixtytwo.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogOnehundredSixtytwoComponent }];

@NgModule({
  declarations: [HomeRuBlogOnehundredSixtytwoComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredSixtytwoRuBlogModule { }
