import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogOnehundredThirtyeightComponent } from './home-en-blog-onehundred-thirtyeight/home-en-blog-onehundred-thirtyeight.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogOnehundredThirtyeightComponent }];

@NgModule({
  declarations: [HomeEnBlogOnehundredThirtyeightComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredThirtyeightEnBlogModule { }
