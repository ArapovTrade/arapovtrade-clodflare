import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogOnehundredThirtytwoComponent } from './home-uk-blog-onehundred-thirtytwo/home-uk-blog-onehundred-thirtytwo.component';


import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogOnehundredThirtytwoComponent }];

@NgModule({
  declarations: [HomeUkBlogOnehundredThirtytwoComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredThirtytwoUkBlogModule { }
