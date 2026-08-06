import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogOnehundredSeventysevenComponent } from './home-ru-blog-onehundred-seventyseven/home-ru-blog-onehundred-seventyseven.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogOnehundredSeventysevenComponent }];

@NgModule({
  declarations: [HomeRuBlogOnehundredSeventysevenComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredSeventysevenRuBlogModule { }
