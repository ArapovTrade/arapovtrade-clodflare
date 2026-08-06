import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogOnehundredSeventyoneComponent } from './home-en-blog-onehundred-seventyone/home-en-blog-onehundred-seventyone.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogOnehundredSeventyoneComponent }];

@NgModule({
  declarations: [HomeEnBlogOnehundredSeventyoneComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredSeventyoneEnBlogModule { }
