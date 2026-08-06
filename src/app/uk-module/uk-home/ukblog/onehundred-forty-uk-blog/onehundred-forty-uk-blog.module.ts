import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogOnehundredFortyComponent } from './home-uk-blog-onehundred-forty/home-uk-blog-onehundred-forty.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogOnehundredFortyComponent }];

@NgModule({
  declarations: [HomeUkBlogOnehundredFortyComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredFortyUkBlogModule { }
