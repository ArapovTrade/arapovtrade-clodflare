import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogOnehundredFiftyeightComponent } from './home-en-blog-onehundred-fiftyeight/home-en-blog-onehundred-fiftyeight.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogOnehundredFiftyeightComponent }];

@NgModule({
  declarations: [HomeEnBlogOnehundredFiftyeightComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredFiftyeightEnBlogModule { }
