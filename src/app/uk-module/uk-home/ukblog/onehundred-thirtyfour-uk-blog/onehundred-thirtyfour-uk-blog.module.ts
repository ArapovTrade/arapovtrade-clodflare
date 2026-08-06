import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogOnehundredThirtyfourComponent } from './home-uk-blog-onehundred-thirtyfour/home-uk-blog-onehundred-thirtyfour.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogOnehundredThirtyfourComponent }];

@NgModule({
  declarations: [HomeUkBlogOnehundredThirtyfourComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredThirtyfourUkBlogModule { }
