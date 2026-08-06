import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogOnehundredTwoComponent } from './home-uk-blog-onehundred-two/home-uk-blog-onehundred-two.component';
import { MatExpansionModule } from '@angular/material/expansion';


import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogOnehundredTwoComponent }];

@NgModule({
  declarations: [HomeUkBlogOnehundredTwoComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredTwoUkBlogModule { }
