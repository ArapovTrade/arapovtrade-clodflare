import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogOnehundredSeventythreeComponent } from './home-uk-blog-onehundred-seventythree/home-uk-blog-onehundred-seventythree.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogOnehundredSeventythreeComponent }];

@NgModule({
  declarations: [HomeUkBlogOnehundredSeventythreeComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredSeventythreeUkBlogModule { }
