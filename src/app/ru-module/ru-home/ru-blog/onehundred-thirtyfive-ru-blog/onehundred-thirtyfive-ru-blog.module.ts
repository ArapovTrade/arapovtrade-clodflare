import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogOnehundredThirtyfiveComponent } from './home-ru-blog-onehundred-thirtyfive/home-ru-blog-onehundred-thirtyfive.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogOnehundredThirtyfiveComponent }];

@NgModule({
  declarations: [HomeRuBlogOnehundredThirtyfiveComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredThirtyfiveRuBlogModule { }
