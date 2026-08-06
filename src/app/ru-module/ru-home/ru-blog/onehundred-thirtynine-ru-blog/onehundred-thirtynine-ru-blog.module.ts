import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogOnehundredThirtynineComponent } from './home-ru-blog-onehundred-thirtynine/home-ru-blog-onehundred-thirtynine.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogOnehundredThirtynineComponent }];

@NgModule({
  declarations: [HomeRuBlogOnehundredThirtynineComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredThirtynineRuBlogModule { }
