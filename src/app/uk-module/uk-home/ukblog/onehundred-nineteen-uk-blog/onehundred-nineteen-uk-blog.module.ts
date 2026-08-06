import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogOnehundredNineteenComponent } from './home-uk-blog-onehundred-nineteen/home-uk-blog-onehundred-nineteen.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogOnehundredNineteenComponent }];

@NgModule({
  declarations: [HomeUkBlogOnehundredNineteenComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredNineteenUkBlogModule { }
