import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogOnehundredSixtytwoComponent } from './home-en-blog-onehundred-sixtytwo/home-en-blog-onehundred-sixtytwo.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogOnehundredSixtytwoComponent }];

@NgModule({
  declarations: [HomeEnBlogOnehundredSixtytwoComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredSixtytwoEnBlogModule { }
