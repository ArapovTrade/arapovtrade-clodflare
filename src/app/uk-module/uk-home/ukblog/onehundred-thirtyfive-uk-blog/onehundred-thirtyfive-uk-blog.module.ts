import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogOnehundredThirtyfiveComponent } from './home-uk-blog-onehundred-thirtyfive/home-uk-blog-onehundred-thirtyfive.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogOnehundredThirtyfiveComponent }];

@NgModule({
  declarations: [HomeUkBlogOnehundredThirtyfiveComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredThirtyfiveUkBlogModule { }
