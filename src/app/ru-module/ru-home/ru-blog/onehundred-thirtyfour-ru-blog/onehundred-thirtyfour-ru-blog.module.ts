import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogOnehundredThirtyfourComponent } from './home-ru-blog-onehundred-thirtyfour/home-ru-blog-onehundred-thirtyfour.component';


import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogOnehundredThirtyfourComponent }];

@NgModule({
  declarations: [HomeRuBlogOnehundredThirtyfourComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredThirtyfourRuBlogModule { }
