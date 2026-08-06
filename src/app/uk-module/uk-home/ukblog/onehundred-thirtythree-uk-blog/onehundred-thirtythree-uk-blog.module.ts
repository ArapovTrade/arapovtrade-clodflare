import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogOnehundredThirtythreeComponent } from './home-uk-blog-onehundred-thirtythree/home-uk-blog-onehundred-thirtythree.component';


import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogOnehundredThirtythreeComponent }];

@NgModule({
  declarations: [HomeUkBlogOnehundredThirtythreeComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredThirtythreeUkBlogModule { }
