import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogOnehundredSixtythreeComponent } from './home-uk-blog-onehundred-sixtythree/home-uk-blog-onehundred-sixtythree.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogOnehundredSixtythreeComponent }];

@NgModule({
  declarations: [HomeUkBlogOnehundredSixtythreeComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredSixtythreeUkBlogModule { }
