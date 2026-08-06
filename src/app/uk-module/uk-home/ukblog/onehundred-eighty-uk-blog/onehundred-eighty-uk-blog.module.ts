import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogOnehundredEightyComponent } from './home-uk-blog-onehundred-eighty/home-uk-blog-onehundred-eighty.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogOnehundredEightyComponent }];

@NgModule({
  declarations: [HomeUkBlogOnehundredEightyComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredEightyUkBlogModule { }
