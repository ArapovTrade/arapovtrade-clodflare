import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogOnehundredFiftythreeComponent } from './home-uk-blog-onehundred-fiftythree/home-uk-blog-onehundred-fiftythree.component';


import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogOnehundredFiftythreeComponent }];

@NgModule({
  declarations: [HomeUkBlogOnehundredFiftythreeComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredFiftythreeUkBlogModule { }
