import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogOnehundredEightythreeComponent } from './home-uk-blog-onehundred-eightythree/home-uk-blog-onehundred-eightythree.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogOnehundredEightythreeComponent }];

@NgModule({
  declarations: [HomeUkBlogOnehundredEightythreeComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredEightythreeUkBlogModule { }
