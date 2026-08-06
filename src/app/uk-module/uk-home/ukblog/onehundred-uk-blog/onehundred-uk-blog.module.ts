import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogOnehundredComponent } from './home-uk-blog-onehundred/home-uk-blog-onehundred.component';
import { MatExpansionModule } from '@angular/material/expansion';


import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogOnehundredComponent }];

@NgModule({
  declarations: [HomeUkBlogOnehundredComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredUkBlogModule { }
