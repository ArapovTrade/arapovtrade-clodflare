import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogOnehundredSixtyfourComponent } from './home-uk-blog-onehundred-sixtyfour/home-uk-blog-onehundred-sixtyfour.component';


import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogOnehundredSixtyfourComponent }];

@NgModule({
  declarations: [HomeUkBlogOnehundredSixtyfourComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredSixtyfourUkBlogModule { }
