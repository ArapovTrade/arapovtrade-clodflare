import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogOnehundredThirtynineComponent } from './home-uk-blog-onehundred-thirtynine/home-uk-blog-onehundred-thirtynine.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogOnehundredThirtynineComponent }];

@NgModule({
  declarations: [HomeUkBlogOnehundredThirtynineComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredThirtynineUkBlogModule { }
