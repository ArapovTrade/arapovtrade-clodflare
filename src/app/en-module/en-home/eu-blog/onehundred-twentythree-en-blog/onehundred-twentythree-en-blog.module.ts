import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogOnehundredTwentythreeComponent } from './home-en-blog-onehundred-twentythree/home-en-blog-onehundred-twentythree.component';


import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogOnehundredTwentythreeComponent }];

@NgModule({
  declarations: [HomeEnBlogOnehundredTwentythreeComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredTwentythreeEnBlogModule { }
