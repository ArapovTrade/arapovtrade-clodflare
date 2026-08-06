import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogOnehundredSeventysevenComponent } from './home-en-blog-onehundred-seventyseven/home-en-blog-onehundred-seventyseven.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogOnehundredSeventysevenComponent }];

@NgModule({
  declarations: [HomeEnBlogOnehundredSeventysevenComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredSeventysevenEnBlogModule { }
