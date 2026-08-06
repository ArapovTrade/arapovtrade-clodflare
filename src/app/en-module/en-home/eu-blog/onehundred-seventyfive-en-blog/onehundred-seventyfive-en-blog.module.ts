import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogOnehundredSeventyfiveComponent } from './home-en-blog-onehundred-seventyfive/home-en-blog-onehundred-seventyfive.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogOnehundredSeventyfiveComponent }];

@NgModule({
  declarations: [HomeEnBlogOnehundredSeventyfiveComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredSeventyfiveEnBlogModule { }
