import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogOnehundredNinetyeightComponent } from './home-en-blog-onehundred-ninetyeight/home-en-blog-onehundred-ninetyeight.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogOnehundredNinetyeightComponent }];

@NgModule({
  declarations: [HomeEnBlogOnehundredNinetyeightComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredNinetyeightEnBlogModule { }
