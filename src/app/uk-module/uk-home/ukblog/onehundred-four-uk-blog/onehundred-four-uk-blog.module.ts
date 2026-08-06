import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogOnehundredFourComponent } from './home-uk-blog-onehundred-four/home-uk-blog-onehundred-four.component';
import { MatExpansionModule } from '@angular/material/expansion';


import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogOnehundredFourComponent }];

@NgModule({
  declarations: [HomeUkBlogOnehundredFourComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredFourUkBlogModule { }
